import "../css/TaskList.css";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

// receiving properties from TaskListPage
function TaskList(props) {
  const { compact } = props;
  // State for new task input
  const [newTask, setNewTask] = useState("");

  // for inline task editing
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");

  // State to track the dragged item
  const [draggedIndex, setDraggedIndex] = useState(null);

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
    setEditingIndex(index);
    setEditedDescription(currentDescription);
  }

  // save task function when editing
  function saveTask(index) {
    // make sure input isnt empty
    if (editedDescription.trim() !== "" && editedDescription !== null) {
      props.onEditTask(index, editedDescription);
    }
    setEditingIndex(null);
    setEditedDescription("");
  }

  // cancel edit task with escape key
  // need to update this
  function cancelEdit() {
    setEditingIndex(null);
    // setEditedDescription("");
  }

  // store the index of the dragged item
  function handleDragStart(index) {
    setDraggedIndex(index);
  }

  // Handle drag over
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Handle drop
  function handleDrop(index, event) {
    event.preventDefault();
    // index of dragged item
    const fromIndex = draggedIndex;
    // index of drop target
    const toIndex = index;

    // check if the item is dropped in a different index
    if (fromIndex !== toIndex) {
      // copy of the tasks array
      const updatedTasks = [...props.tasks];
      // remove the dragged tasks from its origional position
      const [draggedTask] = updatedTasks.splice(fromIndex, 1);
      // insert task at new position
      updatedTasks.splice(toIndex, 0, draggedTask);
      props.onReorderTasks(updatedTasks);
    }

    // clear the dragged index
    setDraggedIndex(null);
    event.currentTarget.classList.remove("dragging");
  }

  // Handle drag end
  function handleDragEnd() {
    setDraggedIndex(null);
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
        <button className="add-task-button" onClick={addTask}>
          🡆
          {/* ↵ 🡺 🡆 ➤ ➔ */}
        </button>
      </div>

      {/* List of tasks */}
      <ul className="task-list">
        {props.tasks.map((task, index) => (
          <li
            key={index}
            className="task-item"
            draggable={editingIndex !== index} // Disable dragging during editing
            // dragging tasks
            onDragStart={(e) => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(index, e)}
            onDragEnd={handleDragEnd}
          >
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

              {editingIndex === index ? (
                // If this task is currently being edited, render an input field
                <div className="edit-task-wrapper">
                  <input
                    type="text"
                    className="edit-task-input"
                    // Binds input value to state
                    value={editedDescription}
                    // Update state as the user types
                    onChange={(e) => setEditedDescription(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveTask(index); // Save task on Enter key
                      if (e.key === "Escape") cancelEdit(); // Cancel editing on Escape key
                    }}
                    // Automatically save when user clicks outside the input
                    onBlur={() => saveTask(index)}
                    autoFocus // Automatically focus the input when it appears
                  />
                  {/* Save and Cancel buttons */}
                  <button className="save-btn" onClick={() => saveTask(index)}>
                    ✔
                  </button>

                  {/* cancel button work in progress */}
                  {/* <button className="cancel-btn" onClick={cancelEdit}>✖</button> */}
                </div>
              ) : (
                // If not editing, show the task description as text
                <span
                  className={task.completed ? "completed" : ""} // Apply "completed" style if task is marked done
                  onDoubleClick={() => editTask(index, task.description)} // Optional: Start editing on double-click
                >
                  {task.description} {/* Render the task description */}
                </span>
              )}
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
                <FaRegTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;