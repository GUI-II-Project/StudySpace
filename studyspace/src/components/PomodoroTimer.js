import React, { useState } from 'react';
import { BsFillPlayFill } from "react-icons/bs";
import { MdOutlineReplay } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const DEFAULT_TIME = 1500;

// TODO: Run play button to start timer, change to pause button, and reset buttons grayed out, 
// and duration buttons grayed out

const PomodoroTimer = () => {
  const [time, setTime] = useState(DEFAULT_TIME);
  
  const resetTime = () => {
    setTime(DEFAULT_TIME);
  };

  const incrementTime = () => {
    setTime(prevTime => (prevTime + 60));
  };

  const decrementTime = () => {
    setTime(prevTime => (prevTime > 0 ? prevTime - 60 : 0));
  };

  return(
    <div class="card text-white bg-dark text-start" style={{ width: '25rem' }}>
      <div class="card-body">
        <h5 class="card-title">Pomodoro timer</h5>
        <div className="d-flex align-items-center">
          <h1 className="card-title fw-bold" style={{ fontSize: '4rem', paddingRight: '0.5rem' }}>
            {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
          </h1>
          <BsFillPlayFill size={30} />
          <MdOutlineReplay type="button" size={30} onClick={resetTime}/>
        </div>
        <div className="d-flex align-items-center gap-2">
          <CiCirclePlus type="button" size={20} onClick={incrementTime}/>
          <p class="card-title" style={{ paddingTop: '0.3rem' }}>Duration</p>
          <CiCircleMinus type="button" size={20} onClick={decrementTime}/>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
