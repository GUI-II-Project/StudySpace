import React, { useState, useEffect, useRef } from "react";
import TaskList from "./TaskList.js";
import { database } from "../configuration.jsx";
import { ref, set, onValue } from "firebase/database";

function TaskManager({ compact }) {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([]);

  // Only save changes after initial load
  const hasLoaded = useRef(false);

  // Load tasks from Firebase when the component mounts
  useEffect(() => {
    const tasksRef = ref(database, "tasks");
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTasks(data);
      }
      hasLoaded.current = true;
    });
  }, []);

  // Save tasks to Firebase whenever they change, but not on initial load
  useEffect(() => {
    if (hasLoaded.current) {
      const tasksRef = ref(database, "tasks");
      set(tasksRef, tasks);
    }
  }, [tasks]);

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
      {/* <NavBar /> */}
      <div className="page-container">
        {/* TaskList component to display and manage tasks */}
        <TaskList
          tasks={tasks}
          onAddTask={addTask}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onAddDeadline={addDeadline}
          onCheckTask={checkTask}
          compact={compact} // this to adjust UI
        />
      </div>
    </div>
  );
}

export default TaskManager;
