import React from "react";
import NavBar from "../components/NavBar";
import Greeting from "../components/Greeting";
import Quote from "../components/Quote";

const HomePage = () => {
  return (
    <div>
      <div className="vh-100 d-flex flex-column">
        <NavBar />
        <div
          className="d-flex justify-content-center flex-grow-1"
          style={{ marginTop: "11rem" }}
        >
          <Greeting />
        </div>
        <Quote />
      </div>
    </div>
  );
};

export default HomePage;
