import React from 'react';
import { BsFillPlayFill } from "react-icons/bs";
import { MdOutlineReplay } from "react-icons/md";

class PomodoroTimer extends React.Component {
  render() {
    return(
        <div class="card text-white bg-dark text-start" style={{ width: '20rem' }}>
            <div class="card-body">
                <h5 class="card-title">Pomodoro timer</h5>
                <div className="d-flex align-items-center">
                    <h1 className="card-title fw-bold" style={{ fontSize: '4rem', paddingRight: '0.5rem' }}>25:00</h1>
                    <BsFillPlayFill size={30} />
                    <MdOutlineReplay size={30} />
                </div>
                <p class="card-title">Duration</p>
        </div>
      </div>
    );
  }
}

export default PomodoroTimer;
