import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { auth, provider, signInWithPopup, signOut } from "./firebaseConfig";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const GoogleCalendar = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const start = () => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            const googleAuth = gapi.auth2.getAuthInstance();
            const currentUser = googleAuth.currentUser.get();
            setUser(googleAuth.isSignedIn.get() ? currentUser : null);
            googleAuth.isSignedIn.listen(() => setUser(googleAuth.currentUser.get()));
          })
          .catch((err) => {
            console.error("GAPI initialization error:", err);
            setError("Failed to initialize Google API");
          });
      });
    };

    if (!window.gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.defer = true;
      script.onload = start;
      document.body.appendChild(script);
    } else {
      start();
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error("Error signing in:", err);
      setError("Google Sign-In failed. Check Firebase Authentication settings.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setEvents([]);
    } catch (err) {
      console.error("Error signing out:", err);
      setError("Failed to sign out.");
    }
  };

  const getEvents = async () => {
    if (!gapi.client || !gapi.client.calendar) {
      console.error("GAPI client not initialized");
      setError("Google API client not loaded yet. Please refresh the page.");
      return;
    }
  
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      });
  
      console.log("Google API Response:", response);
  
      if (response.result.items) {
        setEvents(response.result.items);
      } else {
        setEvents([]);
        setError("No calendar events found.");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(`Failed to fetch events: ${err.message}`);
    }
  };
  
  return (
    <div>
      <h2>Google Calendar Integration</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user ? (
        <>
          <p>Welcome, {user.getBasicProfile ? user.getBasicProfile().getName() : user.displayName}</p>
          <button onClick={logout}>Sign Out</button>
          <button onClick={getEvents}>Get Calendar Events</button>
          <ul>
            {events.length > 0 ? (
              events.map((event) => (
                <li key={event.id}>
                  {event.summary} - {event.start.dateTime ? new Date(event.start.dateTime).toLocaleString() : "No Start Time"}
                </li>
              ))
            ) : (
              <p>No events found.</p>
            )}
          </ul>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default GoogleCalendar;
