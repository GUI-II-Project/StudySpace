import React from 'react';
import { BsFillPlayFill } from "react-icons/bs";
import { MdOutlineReplay } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

class PomodoroTimer extends React.Component {
  render() {
    return(
      <div class="card text-white bg-dark text-start" style={{ width: '25rem' }}>
        <div class="card-body">
          <h5 class="card-title">Pomodoro timer</h5>
          <div className="d-flex align-items-center">
            <h1 className="card-title fw-bold" style={{ fontSize: '4rem', paddingRight: '0.5rem' }}>25:00</h1>
            <BsFillPlayFill size={30} />
            <MdOutlineReplay size={30} />
          </div>
          <div className="d-flex align-items-center gap-2">
            <CiCirclePlus size={20} />
            <p class="card-title" style={{ paddingTop: '0.3rem' }}>Duration</p>
            <CiCircleMinus size={20} />
          </div>
        </div>
      </div>
    );
  }
}

export default PomodoroTimer;
