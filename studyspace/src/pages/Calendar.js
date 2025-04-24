import React, { useEffect, useState, useRef } from "react";
import { gapi } from "gapi-script";
import NavBar from "../components/NavBar";
import CalendarComponent from "../components/CalendarComponent";
import "../css/calendar.css";
import { database } from "../configuration.jsx";
import { ref, set, onValue } from "firebase/database";
import { useAuth } from "../context/AuthContext";

function Calendar() {
  const { user: currentUser } = useAuth();
  const [events, setEvents] = useState([]);

  const dialogRef = useRef(null);
  const [selDate, setSelDate] = useState("");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  const isTimeValid = startTime <= endTime;
  const isFormValid = title.trim() !== "" && isTimeValid;

  const CLIENT_ID =
    "42061456172-sj2edlc4ik9e0k5r8hrk6t8dsk8kqahg.apps.googleusercontent.com";
  const API_KEY = "AIzaSyAVNUZbCqoIgHJIf6V420ugz_wKaQiPwl8";
  const SCOPES = "https://www.googleapis.com/auth/calendar";
  const DISC_DOCS =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

  useEffect(() => {
    if (!currentUser?.uid) return;

    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISC_DOCS],
          scope: SCOPES,
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          if (auth) {
            if (!auth.isSignedIn.get()) {
              auth.signIn().then(syncAllEvents);
            } else {
              syncAllEvents();
            }

            auth.isSignedIn.listen((signedIn) => {
              if (signedIn) syncAllEvents();
            });
          }
        })
        .catch(console.error);
    });
  }, [currentUser]);

  function syncAllEvents() {
    if (!currentUser?.uid) return;

    const fbRef = ref(database, `calendarEvents/${currentUser.uid}`);
    onValue(fbRef, (snapshot) => {
      const fbData = snapshot.val() || {};
      const fbEvents = Object.values(fbData);

      gapi.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 20,
          orderBy: "startTime",
        })
        .then((res) => {
          const googleEvents = (res.result.items || [])
            .filter((e) => e.start?.dateTime)
            .map((e) => ({
              id: e.id,
              title: e.summary,
              start: e.start.dateTime,
              end: e.end.dateTime,
            }));

          const uniqueMap = new Map();
          [...fbEvents, ...googleEvents].forEach((ev) => {
            if (!uniqueMap.has(ev.id)) uniqueMap.set(ev.id, ev);
          });

          setEvents(Array.from(uniqueMap.values()));
        })
        .catch(console.error);
    });
  }

  function handleDateClick(arg) {
    setSelDate(arg.dateStr);
    setTitle("");
    setStartTime("09:00");
    setEndTime("10:00");
    setEditMode(false);
    setEditEventId(null);
    dialogRef.current.showModal();
  }

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

  function handleDeleteClick(id) {
    if (!currentUser?.uid) return;

    gapi.client.calendar.events
      .delete({ calendarId: "primary", eventId: id })
      .then(() => {
        const path = `calendarEvents/${currentUser.uid}/${id}`;
        set(ref(database, path), null);
        setEvents((prev) => prev.filter((e) => e.id !== id));
      })
      .catch(console.error);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const startDT = `${selDate}T${startTime}:00`;
    const endDT = `${selDate}T${endTime}:00`;

    const event = {
      summary: title,
      start: { dateTime: startDT, timeZone: "America/New_York" },
      end: { dateTime: endDT, timeZone: "America/New_York" },
    };

    const request = editMode
      ? gapi.client.calendar.events.update({
          calendarId: "primary",
          eventId: editEventId,
          resource: event,
        })
      : gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event,
        });

    request
      .then((res) => {
        const gEvent = res.result;
        const updatedEvent = {
          id: gEvent.id,
          title: gEvent.summary,
          start: gEvent.start.dateTime,
          end: gEvent.end.dateTime,
        };

        if (currentUser?.uid) {
          const path = `calendarEvents/${currentUser.uid}/${gEvent.id}`;
          set(ref(database, path), updatedEvent);
        }

        setEvents((prev) => {
          const withoutOld = prev.filter((e) => e.id !== gEvent.id);
          return [...withoutOld, updatedEvent];
        });

        dialogRef.current.close();
        setEditMode(false);
        setEditEventId(null);
      })
      .catch((err) => {
        console.error("Event save failed", err);
        dialogRef.current.close();
      });
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
            <p style={{ color: "#f87171" }}>Title is required.</p>
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
              End time must be after start time.
            </p>
          )}
          <menu>
            <button type="submit" disabled={!isFormValid}>
              {editMode ? "Update" : "Add"} Event
            </button>
            <button type="button" onClick={() => dialogRef.current.close()}>
              Cancel
            </button>
          </menu>
        </form>
      </dialog>

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
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(event.id)}
                  style={{ marginLeft: "4px", color: "red" }}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;
