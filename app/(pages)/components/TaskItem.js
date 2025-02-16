import { deleteTask } from "./services/api";

export default function TaskItem({ task, onEditTask, onTaskUpdated,done }) {
  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      onTaskUpdated();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={`${done?'bg-green-300 hover:bg-green-400':'bg-gray-300 hover:bg-blue-200'}  p-2 px-4 transition-all duration-600 ease-out rounded-lg my-3 w-full  hover:shadow-xl`}>
      <div className="w-full grid grid-cols-4 content-center items-center gap-2">
        <div className="col-span-2">
          <h4 className="text-xl font-semibold">{task.title}</h4>
          <p className="text-sm text-gray-700">{task.description}</p>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-gray-800 w-full mt-3 rounded-md text-white py-1 px-4 hover:bg-gray-700"
            onClick={() => onEditTask(task)}
          >
            Edit
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-red-800 w-full mt-3 rounded-md text-white py-1 px-4 hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
