import PomodoroTimer from "./PomodoroTimer";
import Player from "./Player";

function Sidebar() {
  return (
    <div>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        Button
      </button>
      <div
        class="offcanvas offcanvas-end text-white"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ backgroundColor: "#212B58" }}
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
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
        <div class="offcanvas-body">
          <PomodoroTimer />
          <Player />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
