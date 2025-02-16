"use client";
import { useState, useEffect } from "react";
import { createTask, updateTask } from "./services/api";

export default function TaskForm({ onTaskAdded, editingTask, setEditingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("To Do");
    if (setEditingTask) {
      setEditingTask(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status, position: Date.now() };

    if (editingTask) {
      await updateTask(editingTask._id, taskData);
    } else {
      await createTask(taskData);
    }
    resetForm();
    onTaskAdded();
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-4">
      <form onSubmit={handleSubmit} >
        <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-4">
          <div>
            <input
              type="text"
              className="theme-input rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              required
            />
          </div>

          <div>
            <input
              type="text"
              className="theme-input rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
            />
          </div>

          <div>
            <select
              className="theme-input rounded-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>
          </div>

          {editingTask && (
            <>
            <div className="col-span-3"></div>
            <div className="">
              <button
                type="button"
                className="w-full text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={resetForm}
              >
                Cancel Editing
              </button>
            </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
