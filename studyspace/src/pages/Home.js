import React from "react";
import NavBar from "../components/NavBar";
import PomodoroTimer from "../components/PomodoroTimer";
import Greeting from "../components/Greeting";
import Player from "../components/Player";

function HomePage() {
  return (
    <div className="vh-100 d-flex flex-column">
      <NavBar />
      <PomodoroTimer />
      <Player />
      <div
        className="d-flex justify-content-center flex-grow-1"
        style={{ marginTop: "150px" }}
      >
        <Greeting />
      </div>
    </div>
  );
}

export default HomePage;
