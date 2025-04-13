import "../css/TaskList.css";
import React, { useState } from "react";

// receiving properties from TaskListPage
function TaskList(props) {
  const { compact } = props;
  // State for new task input
  const [newTask, setNewTask] = useState("");

  // Adds a task
  // check if input isnt empty
  function addTask() {
    if (newTask.trim() !== "") {
      props.onAddTask(newTask);
      setNewTask(""); // Reset the input bar
    }
  }

  // Updates newTask state as user types
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Triggers task addition on Enter key press
  // This is used when adding a task
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  // Toggles the check box
  function checkTask(index) {
    props.onCheckTask(index);
  }

  // Delete a task
  function deleteTask(index) {
    props.onDeleteTask(index);
  }

  // Edits task description
  function editTask(index, currentDescription) {
    const newDescription = prompt("Edit your task:", currentDescription);

    // check if new input isnt empty
    if (newDescription !== null && newDescription.trim() !== "") {
      props.onEditTask(index, newDescription);
    }
  }

  // Render the task list component to the page
  return (
    <div className={`task-list-container ${compact ? "compact" : ""}`}>
      <div className="task-list-header">
        {" "}
        {/* Header with title and date (change this to make display the current date) */}
        <h2>Tasks</h2>
        {/* getting and displaying the current date */}
        <span>
          {new Date().toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="add-task">
        {" "}
        {/* New task input section */}
        <span className="add-task-icon">+</span> {/* plus icon styling */}
        <input
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={handleInputChange} /* for changing tasks */
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* List of tasks */}
      <ul className="task-list">
        {props.tasks.map((task, index) => (
          <li key={index} className="task-item">
            {/* Task description and controls */}
            <div className="task-content">
              {/* Edit button */}
              <button
                className="edit-btn"
                onClick={() => editTask(index, task.description)}
              >
                ✎
              </button>

              {/* display and toggling for check box */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => checkTask(index)}
              />

              {/* display task description, conditional styling if task is completed */}
              <span className={task.completed ? "completed" : ""}>
                {task.description}
              </span>
            </div>

            {/* Task actions for deadline */}
            <div className="task-actions">
              {/* Show deadline if it's set, otherwise show "Add deadline" */}
              <span
                className="deadline-btn"
                onClick={() =>
                  document.getElementById(`date-picker-${index}`).showPicker()
                }
              >
                {task.deadline || "+Add deadline"}
              </span>

              {/* Hidden date input to trigger native picker */}
              <input
                type="date"
                id={`date-picker-${index}`}
                className="hidden-date-input"
                value={task.deadline || ""}
                onChange={(e) => props.onAddDeadline(index, e.target.value)}
              />

              {/* Delete button */}
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
