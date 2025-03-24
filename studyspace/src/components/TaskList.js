import '../TaskList.css';
import React, { useState } from 'react';

// receiving properties from TaskListPage
function TaskList(props) {
  // State for new task input
  const [newTask, setNewTask] = useState('');

  // Adds a task
  // check if input isnt empty
  function addTask() {
    if (newTask.trim() !== '') {
      props.onAddTask(newTask);
      setNewTask(''); // Reset the input bar
    }
  }

  // Updates newTask state as user types
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Triggers task addition on Enter key press
  // This is used when adding a task
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
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
    if (newDescription !== null && newDescription.trim() !== '') {
      props.onEditTask(index, newDescription);
    }
  }

  // Add a deadline or change a deadline
  // Currently, any string can be entered, maybe change this so that the user can pick from a calendar pop up
  function deadlineChange(index) {
    const deadline = prompt("Set a deadline (example: 3/20/2024):");

    // check if the input isnt empty
    if (deadline !== null && deadline.trim() !== '') {
      props.onAddDeadline(index, deadline);
    }
  }

  // Render the task list component to the page
  return (
    <div className="task-list-container">
      <div className="task-list-header">        {/* Header with title and date (change this to make display the current date) */}
        <h2>Tasks</h2>
        <span>March 23, 2025</span>
      </div>

      <div className="add-task">                {/* New task input section */}
        <span className="add-task-icon">+</span>    {/* plus icon styling */}
        <input
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={handleInputChange}    /* for changing tasks */
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
              <span className={task.completed ? 'completed' : ''}>
                {task.description}
              </span>
            </div>

            {/* Task actions for deadline and delete */}
            <div className="task-actions">

              {/* if a deadline is set, show it */}
              {task.deadline ? <span className="deadline">{task.deadline}</span> : null}

              {/* Deadline setting button */}
              <button
                className="deadline-btn"
                onClick={() => deadlineChange(index)}
              >
                <span className="deadline-task-icon">+</span>     {/* plus icon styling */}
                Add Deadline
              </button>

              {/* Delete button */}
              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
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