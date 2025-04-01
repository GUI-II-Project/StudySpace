import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import "../App.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const CLIENT_ID =
    "42061456172-sj2edlc4ik9e0k5r8hrk6t8dsk8kqahg.apps.googleusercontent.com";
  const API_KEY = "AIzaSyAVNUZbCqoIgHJIf6V420ugz_wKaQiPwl8";
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  useEffect(() => {
    function initClient() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISCOVERY_DOC],
          scope: SCOPES,
        })
        .then(() => {
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => listUpcomingEvents())
            .catch((err) => console.error("Authentication error:", err));
        })
        .catch((err) => console.error("Google API error:", err));
    }

    gapi.load("client:auth2", initClient);
  }, []);

  const listUpcomingEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then((response) => {
        setEvents(response.result.items || []);
      })
      .catch((err) => console.error("Calendar API error:", err));
  };

  return (
    <div className="container-fluid py-5 px-4">
      <div className="text-center mb-5">
        <h1 className="text-white display-4 fw-bold">Your Calendar</h1>
        <p className="text-light fs-5">
          View and manage your study schedule with ease.
        </p>
      </div>

      <div className="mb-5" style={{ width: "100%" }}>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=primary&ctz=America/New_York"
          style={{
            border: 0,
            width: "100%",
            height: "80vh",
            minHeight: "500px",
          }}
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
        ></iframe>
      </div>

      <div className="text-center">
        <h2 className="text-white mb-3">Upcoming Events</h2>
        <ul className="text-white list-unstyled">
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id}>
                {event.summary} –{" "}
                {new Date(
                  event.start.dateTime || event.start.date,
                ).toLocaleString()}
              </li>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
