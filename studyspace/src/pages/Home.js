import React from "react";
import NavBar from "../components/NavBar";
import PomodoroTimer from "../components/PomodoroTimer";
import Player from "../components/Player";

function HomePage() {
  return (
    <div>
      <NavBar />
      <PomodoroTimer />
      <Player />
    </div>
  );
}

export default HomePage;
