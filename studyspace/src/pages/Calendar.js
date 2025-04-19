import React, { useEffect, useState, useRef } from "react";
import { gapi } from "gapi-script";
import NavBar from "../components/NavBar";
import CalendarComponent from "../components/CalendarComponent";
import "../css/calendar.css";

function Calendar() {
  const [events, setEvents] = useState([]);

  // dialog state
  const dialogRef = useRef(null);
  const [selDate, setSelDate] = useState("");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  // error checking for dialog
  const isTimeValid = startTime <= endTime;
  const isFormValid = title.trim() !== "" && isTimeValid;

  // credentials
  const CLIENT_ID =
    "42061456172-sj2edlc4ik9e0k5r8hrk6t8dsk8kqahg.apps.googleusercontent.com";
  const API_KEY = "AIzaSyAVNUZbCqoIgHJIf6V420ugz_wKaQiPwl8";
  const SCOPES = "https://www.googleapis.com/auth/calendar";
  const DISC_DOCS =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

  useEffect(() => {
    // load gapi client & auth2
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISC_DOCS],
          scope: SCOPES,
        })
        .then(() => {
          const auth = gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => fetchEvents())
            .catch((err) => console.error("Authentication error:", err));

          // if not signed in, prompt
          if (!auth.isSignedIn.get()) {
            auth.signIn();
          }

          // listen for sign‑in state changes
          auth.isSignedIn.listen((signedIn) => {
            if (signedIn) fetchEvents();
          });

          // if already signed in, load events now
          if (auth.isSignedIn.get()) {
            fetchEvents();
          }
        })
        .catch(console.error);
    });
  }, [DISC_DOCS]);

  function fetchEvents() {
    // fetch upcoming from the user's primary calendar
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then((res) => {
        const items = res.result.items || [];
        // map google calendar items to FullCalendar event format
        const fcEvents = items.map((e) => ({
          id: e.id,
          title: e.summary,
          start: e.start.dateTime || e.start.date,
          end: e.end.dateTime || e.end.date,
        }));
        setEvents(fcEvents);
      })
      .catch(console.error);
  }

  // when user clicks a day, open the dialog
  function handleDateClick(arg) {
    setSelDate(arg.dateStr);
    setTitle("");
    setStartTime("09:00");
    setEndTime("10:00");
    dialogRef.current.showModal();
  }

  function handleSubmit(e) {
    e.preventDefault();
    // build google calendar compliant datetime strings
    const startDT = `${selDate}T${startTime}:00`;
    const endDT = `${selDate}T${endTime}:00`;
    const event = {
      summary: title,
      start: {
        dateTime: startDT,
        timeZone: "America/New_York",
      },
      end: {
        dateTime: endDT,
        timeZone: "America/New_York",
      },
    };

    // this part actually creates the event in google calendar
    gapi.client.calendar.events
      .insert({ calendarId: "primary", resource: event })
      .then(() => {
        dialogRef.current.close();
        fetchEvents();
      })
      .catch((err) => {
        console.error("Insert failed", err);
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

      {/* the dialog form */}
      <dialog ref={dialogRef} className="event-dialog">
        <form onSubmit={handleSubmit}>
          <h3>New Event on {selDate}</h3>
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
              Add Event
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
              <li key={event.id}>
                {event.title} –{" "}
                {new Date(event.start).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
