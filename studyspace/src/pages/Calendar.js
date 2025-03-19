import React from "react";
import NavBar from "../components/NavBar";
import CalendarComponent from "../components/CalendarComponent";
import "../App.css";

const Calendar = () => {
  return (
    <div>
      <NavBar />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <CalendarComponent />
      </div>
    </div>
  );
};

export default Calendar;
