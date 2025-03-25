import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    gapi.load("client:auth2", initClient, (err) =>
      console.error("gapi.load error:", err),
    );
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
    <div>
      <div style={{ marginTop: "4rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "white" }}>
          Your Calendar
        </h1>
        <p style={{ fontSize: "1.2rem", color: "gray" }}>
          View and manage your study schedule with ease.
        </p>
      </div>

      <div style={{ marginTop: "2rem", width: "100%" }}>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=primary&ctz=America/New_York"
          style={{
            border: 0,
            width: "100%",
            height: "700px",
            display: "block",
          }}
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
        ></iframe>
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2 style={{ color: "white" }}>Upcoming Events</h2>
        <ul style={{ color: "white", listStyle: "none", padding: 0 }}>
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id}>
                {event.summary} -{" "}
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
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link to="/" className="btn btn-dark">
          Back to Home
        </Link>
      </div>
      <footer className="bg-light pt-2 pb-2" style={{ marginTop: "4rem" }}>
        <div className="container">
          <div className="text-center mt-3">
            <p>
              Study Space 2025. Created by Michelle, Sunny, David, Nik, and
              Lucas.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Calendar;
