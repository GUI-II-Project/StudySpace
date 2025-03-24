import React from "react";
import NavBar from "../components/NavBar";
import PomodoroTimer from '../components/PomodoroTimer';

function HomePage() {
  return (
    <div>
        <NavBar />
        <PomodoroTimer />
    </div>
  );
}

export default HomePage;
