"use client";
import { useEffect, useState } from "react";
import { fetchTasks } from "./services/api";
import TaskColumn from "./TaskColumn";
import TaskForm from "./TaskForm";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SITE_URL, { transports: ["websocket"] });

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
    socket.on("refreshTasks", loadTasks);
    return () => {
      socket.off("refreshTasks");
    };
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="container">
      <TaskForm onTaskAdded={loadTasks} editingTask={editingTask} setEditingTask={setEditingTask} />
      <div className="grid w-100 lg:grid-cols-3 sm:grid-cols-1 gap-5">
        {["To Do", "In Progress", "Done"].map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            onEditTask={setEditingTask}
            onTaskUpdated={loadTasks}
          />
        ))}
      </div>
    </div>
  );
}
