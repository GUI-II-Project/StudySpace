import React from "react";
import NavBar from "../components/NavBar";
import CalendarComponent from "../components/CalendarComponent";
import "../App.css";

const Calendar = () => {
  return (
    <div className="min-vh-100">
      <NavBar />
      <div className="container-fluid px-4 py-5">
        <CalendarComponent />
      </div>
    </div>
  );
};

export default Calendar;
