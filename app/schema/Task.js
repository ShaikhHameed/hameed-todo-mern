import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
  position: { type: Number, required: true },
}, { timestamps: true });

// Check if the model exists before creating one
const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;
