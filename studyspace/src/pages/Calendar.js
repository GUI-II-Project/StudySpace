import React from "react";
import NavBar from "../components/NavBar";
import CalendarComponent from "../components/CalendarComponent";
import "../App.css";

const Calendar = () => {
  return (
    <div className="min-vh-100">
      <NavBar />
      <CalendarComponent />
    </div>
  );
};

export default Calendar;
