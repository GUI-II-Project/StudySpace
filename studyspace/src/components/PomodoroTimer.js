import React, { useState, useRef, useEffect } from 'react';
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { MdOutlineReplay } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const DEFAULT_TIME = 1500;

const PomodoroTimer = () => {
  const [time, setTime] = useState(DEFAULT_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef();
  
  const resetTime = () => {
    setTime(DEFAULT_TIME);
  };

  const incrementTime = () => {
    setTime(prevTime => (prevTime + 60));
  };

  const decrementTime = () => {
    setTime(prevTime => (prevTime - 60 > 0 ? prevTime - 60 : 0));
  };

  const startTimer = () => {
    if (time <= 0) {
      return;
    }
    setIsTimerRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        return prevTime - 1});
    }, 1000);
  }

  const stopTimer = () => {
    setIsTimerRunning(false);
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (time <= 0) {
      stopTimer();
    }
  }, [time]);

  return(
    <div class="card text-white text-start" style={{ width: '25rem', backgroundColor: '#212B58' }}>
      <div class="card-body">
        <h5 class="card-title">Pomodoro timer</h5>
        <div className="d-flex align-items-center">
          <h1 className="card-title fw-bold" style={{ fontSize: '4rem', paddingRight: '0.5rem', 
            width: '12.3rem', textAlign: 'left', whiteSpace: 'nowrap' }}>
            {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
          </h1>
          { isTimerRunning ? <BsFillPauseFill type="button" size={30} onClick={stopTimer} style={{color: '#F4C425'}}/> : 
            <BsFillPlayFill type="button" size={30} onClick={startTimer} style={{color: '#F4C425'}}/> }
          <MdOutlineReplay type="button" size={30} onClick={resetTime} style={{color: '#F4C425'}}/>
        </div>
        <div className="d-flex align-items-center gap-2">
          <CiCirclePlus type="button" size={20} onClick={incrementTime} style={{color: '#F4C425'}}/>
          <p class="card-title" style={{ paddingTop: '0.3rem' }}>Duration</p>
          <CiCircleMinus type="button" size={20} onClick={decrementTime} style={{color: '#F4C425'}}/>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
