import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Greeting from "../components/Greeting";

function HomePage() {
  return (
    <div>
      <div className="vh-100 d-flex flex-column">
        <NavBar />
        <div
          className="d-flex justify-content-center flex-grow-1"
          style={{ marginTop: "150px" }}
        >
          <Greeting />
        </div>
      </div>
      <div
        className="position-fixed bottom-0 end-0"
        style={{ padding: "2rem" }}
      >
        <Sidebar />
      </div>
    </div>
  );
}

export default HomePage;
