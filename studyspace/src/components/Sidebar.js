import PomodoroTimer from "./PomodoroTimer";
import Player from "./Player";
import TaskManager from "./TaskManager.js";
import { MdOutlineMenu } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../configuration.jsx";

function Sidebar() {
  const { logout } = useAuth(); // now available from auth context
  const navigate = useNavigate();

  // handles full logout from Firebase and context, then redirects
  const handleLogout = async () => {
    try {
      await signOut(auth); // firebase logout
      logout(); // update app context
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        className="offcanvas offcanvas-end text-white"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ backgroundColor: "#212B58" }}
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title"
            id="offcanvasExampleLabel"
            style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
          >
            Study Tools
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            style={{ filter: "invert(1)" }}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="offcanvas-body d-flex flex-column justify-content-between"
          style={{ height: "90%" }}
        >
          <div>
            <PomodoroTimer />
            <Player />
            <TaskManager compact /> {/* embedded version of TaskManager */}
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline-light mt-3"
            style={{ width: "100%" }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
