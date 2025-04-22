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
    const newTask = {
      description: newTaskDescription,
      completed: false,
      deadline: "",
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  };

  // Edit a task description at specific index
  const editTask = (index, newTaskDescription) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...tasks[index], description: newTaskDescription };
    setTasks(updatedTasks);
  };

  // Delete a task a specific index
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Add or update a deadline for a task
  const addDeadline = (index, taskDeadline) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], deadline: taskDeadline };
    setTasks(updatedTasks);
  };

  // Toggle checkbox status
  const checkTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setTasks(updatedTasks);
  };

  // Reorder tasks after drag-and-drop
  const reorderTasks = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <div>
      <TaskList
        tasks={tasks}
        onAddTask={addTask}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
        onAddDeadline={addDeadline}
        onCheckTask={checkTask}
        onReorderTasks={reorderTasks}
        compact={compact}
      />
    </div>
  );
}

export default TaskManager;