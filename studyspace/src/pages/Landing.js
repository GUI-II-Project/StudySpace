import React from "react";
import LandingNavBar from "../components/LandingNavBar";
import logo_with_clouds from "../imgs/logo_with_clouds.png";
import main_page from "../imgs/main_page.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const { user } = useAuth(); // get current user from auth context
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{ backgroundColor: "white", width: "100%" }}>
      <LandingNavBar />

      <div style={{ marginTop: "4rem", textAlign: "center" }}>
        <h1
          style={{
            paddingBottom: "1rem",
            fontSize: "4rem",
            fontWeight: "bold",
          }}
        >
          Study Space
        </h1>
        <h4 style={{ paddingBottom: "2rem", fontSize: "2rem" }}>
          Get into flow state.
        </h4>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleGetStarted}
        >
          Get started
        </button>
        <h5 style={{ paddingTop: "7rem" }}>
          ✨ One workspace for all your study needs ✨
        </h5>
      </div>

      <div
        style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        <img
          style={{ maxHeight: "500px", width: "100%", maxWidth: "900px" }}
          className="img-fluid"
          src={main_page}
          alt="main_page"
        />
      </div>

      <div
        id="about"
        style={{ marginTop: "8rem", marginLeft: "8rem", marginRight: "8rem" }}
        className="row justify-content-left"
      >
        <div className="col-sm-12 col-lg-6 text-start">
          <h4 style={{ paddingBottom: "5px", fontWeight: "bold" }}>
            Getting into flow state is hard.
          </h4>
          <h5 className="text-muted" style={{ paddingBottom: "5px" }}>
            And one key barrier? Scattered study tools.
          </h5>
          <p style={{ paddingTop: "1rem" }}>
            Imagine being so immersed in your studies that the perception of
            time fades away, distractions magically disappear, and learning
            feels practically effortless. This is the flow state, a powerful
            cognitive mode of complete focus and clarity.
          </p>
          <p style={{ paddingTop: "1rem" }}>
            But getting into flow state is hard. And one key barrier? Scattered
            study tools. It often feel like students spend more time setting up
            to study than actually studying. Constant application flipping and
            context switching breaks concentration and makes it harder to enter
            and sustain a flow state.
          </p>
          <p style={{ paddingTop: "1rem", fontWeight: "bold" }}>
            Study Space solves this problem.
          </p>
        </div>
        <div className="col-sm-12 col-lg-6">
          <img
            style={{ maxHeight: "350px", paddingLeft: "5rem", paddingTop: "2rem" }}
            className="img-fluid"
            src={logo_with_clouds}
            alt="logo_with_clouds"
          />
        </div>
      </div>

      <div
        style={{ marginTop: "7rem", marginLeft: "8rem", marginRight: "8rem" }}
        className="row justify-content-left"
      >
        <div className="text-start">
          <h4 style={{ paddingBottom: "5px", fontWeight: "bold" }}>
            No more scattered tools. No more wasted time.
          </h4>
          <h5 className="text-muted">
            Just one platform to help you stay organized and focused.
          </h5>
        </div>
      </div>

      <div
        id="features"
        style={{
          marginTop: "2rem",
          marginBottom: "6rem",
          marginLeft: "8rem",
          marginRight: "8rem",
        }}
        className="row justify-content-left text-start row-gap-4"
      >
        <div className="col-12 col-sm-6 col-lg-4">
          <h5 style={{ fontWeight: "bold" }}>✏️ Take notes</h5>
          <p style={{ paddingTop: "5px" }}>
            Jot down and save your greatest ideas and thoughts in the notes tab.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <h5 style={{ fontWeight: "bold" }}>🗓️ Plan what&apos;s next</h5>
          <p style={{ paddingTop: "5px" }}>
            Access an integrated calendar to add events and see what&apos;s
            coming next.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <h5 style={{ fontWeight: "bold" }}>⏳ Stay focused</h5>
          <p style={{ paddingTop: "5px" }}>
            Enhance your productivity and time box your tasks with a Pomodoro
            timer.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <h5 style={{ fontWeight: "bold" }}>🎵 Feel the vibes</h5>
          <p style={{ paddingTop: "5px" }}>
            Set the mood with the music player and turn up that lofi.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <h5 style={{ fontWeight: "bold" }}>💡 Set the tasks</h5>
          <p style={{ paddingTop: "5px" }}>
            Keep track of deadlines and what you need to do with a handy task
            list.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <h5 style={{ fontWeight: "bold" }}>✨ Get inspired</h5>
          <p style={{ paddingTop: "5px" }}>
            Find some motivation with daily quotes to keep the flow going.
          </p>
        </div>
      </div>

      <footer className="bg-light pt-2 pb-2">
        <div className="container">
          <div className="text-center mt-3">
            <p>
              Study Space 2025. Created by Michelle, Sunny, David, Nik, and
              Lucas.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
