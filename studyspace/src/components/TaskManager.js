import React, { useState, useEffect, useRef } from "react";
import TaskList from "./TaskList.js";
import { database } from "../configuration.jsx";
import { ref, set, onValue, off } from "firebase/database";
import { useAuth } from "../context/AuthContext";

function TaskManager({ compact }) {
  const [tasks, setTasks] = useState([]);
  const { user: currentUser } = useAuth();
  const hasInitialized = useRef(false);
  const skipNextSave = useRef(true); // avoid saving right after loading

  // load tasks from firebase on user change
  useEffect(() => {
    if (!currentUser?.uid) return;

    const tasksRef = ref(database, `tasks/${currentUser.uid}`);

    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedTasks = Object.entries(data).map(([id, task]) => ({
        id,
        ...task,
      }));
      setTasks(loadedTasks);
      hasInitialized.current = true;
      skipNextSave.current = true; // skip first auto-save
    });

    return () => {
      off(tasksRef);
      hasInitialized.current = false;
    };
  }, [currentUser]);

  // auto-save tasks to firebase after any change
  useEffect(() => {
    if (!currentUser?.uid || !hasInitialized.current || skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    const taskObj = {};
    tasks.forEach((task) => {
      taskObj[task.id] = {
        description: task.description || "",
        completed: !!task.completed,
        deadline: task.deadline || "",
      };
    });

    const tasksRef = ref(database, `tasks/${currentUser.uid}`);
    set(tasksRef, taskObj).catch(console.error);
  }, [tasks, currentUser]);

  // utility to create a unique id
  const createTaskId = () => `t${Date.now()}`;

  // task action handlers
  const addTask = (description) => {
    const newTask = {
      id: createTaskId(),
      description,
      completed: false,
      deadline: "",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (index, newDescription) => {
    setTasks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], description: newDescription };
      return updated;
    });
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const addDeadline = (index, deadline) => {
    setTasks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], deadline };
      return updated;
    });
  };

  const checkTask = (index) => {
    setTasks((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        completed: !updated[index].completed,
      };
      return updated;
    });
  };

  const reorderTasks = (newOrder) => {
    setTasks(newOrder);
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
