import PomodoroTimer from "./PomodoroTimer";
import Player from "./Player";
import TaskManager from "./TaskManager.js";
import { MdOutlineMenu } from "react-icons/md";

function Sidebar() {
  return (
    <div>
      <MdOutlineMenu
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
        style={{ color: "white", fontSize: "3rem", cursor: "pointer" }}
      >
        Button
      </MdOutlineMenu>
      <div
        class="offcanvas offcanvas-end text-white"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ backgroundColor: "#212B58" }}
      >
        <div class="offcanvas-header">
          <h5
            class="offcanvas-title"
            id="offcanvasExampleLabel"
            style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
          >
            Study Tools
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            style={{ filter: "invert(1)" }}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body" style={{ overflowX: "hidden" }}>
          <PomodoroTimer />
          <Player />
          <TaskManager compact />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
