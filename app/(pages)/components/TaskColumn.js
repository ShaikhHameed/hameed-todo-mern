'use client';
import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskColumn({ status, tasks, onEditTask, onTaskUpdated }) {
  const[doneTask,setDoneTask] = useState(status=='Done'?true:false);
  return (
    <div className={`w-full ${doneTask?'bg-emerald-100':'bg-gray-100'}  p-4 rounded-lg`}>
      <h3 className="text-center text-lg font-semibold mb-2">{status}</h3>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} done={doneTask} onEditTask={onEditTask} onTaskUpdated={onTaskUpdated} />
      ))}
    </div>
  );
}
