// import React, { useState } from "react";
import NavBar from "../components/NavBar.js";
import TaskManager from "../components/TaskManager.js";
import "../css/TaskListPage.css";

function TaskListPage() {
  return (
    <div>
      <NavBar />
      <div className="page-container">
        <TaskManager />
      </div>
    </div>
  );
}

export default TaskListPage;
