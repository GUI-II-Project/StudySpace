import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import CalendarComponent from "../components/CalendarComponent";
import "../css/calendar.css";
import { database } from "../configuration.jsx";
import { ref, set, onValue, remove } from "firebase/database";
import { useAuth } from "../context/AuthContext";

// filter out undefined values before saving
function cleanData(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  );
}

function Calendar() {
  const { user: currentUser } = useAuth(); // get logged-in user
  const [events, setEvents] = useState([]); // store firebase-only events

  const dialogRef = useRef(null); // ref to dialog modal
  const [selDate, setSelDate] = useState("");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  const isTimeValid = startTime <= endTime;
  const isFormValid = title.trim() !== "" && isTimeValid;

  // load events from Firebase
  useEffect(() => {
    if (!currentUser) return;

    const eventsRef = ref(database, `calendarEvents/${currentUser.uid}`);
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedEvents = Object.entries(data).map(([id, event]) => ({
        id,
        ...event,
      }));
      setEvents(loadedEvents);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // open dialog for new event
  function handleDateClick(arg) {
    setSelDate(arg.dateStr);
    setTitle("");
    setStartTime("09:00");
    setEndTime("10:00");
    setEditMode(false);
    setEditEventId(null);
    dialogRef.current.showModal();
  }

  // open dialog pre-filled for editing
  function handleEditClick(event) {
    const start = new Date(event.start);
    const end = new Date(event.end);
    setSelDate(start.toISOString().split("T")[0]);
    setTitle(event.title);
    setStartTime(start.toTimeString().slice(0, 5));
    setEndTime(end.toTimeString().slice(0, 5));
    setEditMode(true);
    setEditEventId(event.id);
    dialogRef.current.showModal();
  }

  // delete event from firebase
  function handleDeleteClick(id) {
    if (!currentUser) return;
    const path = `calendarEvents/${currentUser.uid}/${id}`;
    remove(ref(database, path));
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  // create or update event
  function handleSubmit(e) {
    e.preventDefault();
    if (!currentUser) return;

    const startDT = `${selDate}T${startTime}:00`;
    const endDT = `${selDate}T${endTime}:00`;
    const eventId = editEventId || `event_${Date.now()}`;

    const eventData = {
      id: eventId,
      title,
      start: startDT,
      end: endDT,
    };

    const path = `calendarEvents/${currentUser.uid}/${eventId}`;
    set(ref(database, path), cleanData(eventData))
      .then(() => {
        const updated = editMode
          ? events.map((e) => (e.id === eventId ? eventData : e))
          : [...events, eventData];
        setEvents(updated);
        dialogRef.current.close();
        setEditMode(false);
        setEditEventId(null);
      })
      .catch(console.error);
  }

  return (
    <div>
      <NavBar />
      <div className="calendar-page">
        <div className="calendar-card">
          <div className="card-header">
            <h2>Calendar</h2>
            <span className="card-date">
              {new Date().toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <CalendarComponent events={events} onDateClick={handleDateClick} />
        </div>
      </div>

      {/* event form dialog */}
      <dialog ref={dialogRef} className="event-dialog">
        <form onSubmit={handleSubmit}>
          <h3>
            {editMode ? "Edit" : "New"} Event on {selDate}
          </h3>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
            />
          </label>
          {title.trim() === "" && (
            <p style={{ color: "#f87171" }}>title is required</p>
          )}
          <label>
            Start
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label>
            End
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
          {!isTimeValid && (
            <p style={{ color: "#f87171" }}>
              end time must be after start time
            </p>
          )}
          <menu>
            <button type="submit" disabled={!isFormValid}>
              {editMode ? "update" : "add"} event
            </button>
            <button type="button" onClick={() => dialogRef.current.close()}>
              cancel
            </button>
          </menu>
        </form>
      </dialog>

      {/* upcoming events list */}
      <div
        className="text-center"
        style={{ marginTop: "35px", paddingBottom: "35px" }}
      >
        <h2 className="text-white mb-3">Upcoming Events</h2>
        <ul className="text-white list-unstyled">
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id} style={{ marginBottom: "8px" }}>
                {event.title} –{" "}
                {new Date(event.start).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                <button
                  onClick={() => handleEditClick(event)}
                  style={{ marginLeft: "8px" }}
                >
                  edit
                </button>
                <button
                  onClick={() => handleDeleteClick(event.id)}
                  style={{ marginLeft: "4px", color: "red" }}
                >
                  delete
                </button>
              </li>
            ))
          ) : (
            <p>no events found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;
