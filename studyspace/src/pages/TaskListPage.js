import React, { useState } from "react";
import NavBar from "../components/NavBar.js";
import TaskList from "../components/TaskList.js";
import "../TaskListPage.css";

function TaskListPage() {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([
    // Placeholder tasks
    { description: "Study for math quiz", completed: false, deadline: "" },
    { description: "Do laundry", completed: false, deadline: "3/23" },
    {
      description: "Practice presentation",
      completed: false,
      deadline: "3/24",
    },
  ]);

  // Add a new task to the task array, with status uncompleted and no deadline
  const addTask = (newTaskDescription) => {
    // create a new task object with the new tasks description
    const newTask = {
      description: newTaskDescription,
      completed: false,
      deadline: "",
    };
    // make a new array and add the new task to the existing tasks
    const updatedTasks = [...tasks, newTask];
    // Update the state with the new array
    setTasks(updatedTasks);
  };

  // Edit a task description at specific index
  const editTask = (index, newTaskDescription) => {
    // Create a copy of the tasks array to update
    const updatedTasks = [...tasks];
    // Edit the task at the index with the new description
    updatedTasks[index] = { ...tasks[index], description: newTaskDescription };
    setTasks(updatedTasks);
  };

  // Delete a task a specific index
  const deleteTask = (index) => {
    // .filter makes a new array that doesnt include the task at the index, so that it is removed
    // first paramater isnt used so "_" is a placeholder
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Add or update a deadline for a task
  const addDeadline = (index, taskDeadline) => {
    // copy task array
    const updatedTasks = [...tasks];
    // Update the deadline of task at index
    updatedTasks[index] = { ...updatedTasks[index], deadline: taskDeadline };
    setTasks(updatedTasks);
  };

  // Check box
  const checkTask = (index) => {
    const updatedTasks = [...tasks];
    // Toggle the completed status (checkbox) of the specific task
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setTasks(updatedTasks);
  };

  return (
    <div>
      <NavBar />
      <div className="page-container">
        {/* TaskList component to display and manage tasks */}
        <TaskList
          tasks={tasks}
          onAddTask={addTask}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onAddDeadline={addDeadline}
          onCheckTask={checkTask}
        />
      </div>
    </div>
  );
}

export default TaskListPage;
