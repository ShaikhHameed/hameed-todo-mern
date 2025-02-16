import TaskBoard from "../components/TaskBoard";
export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="font-bold text-3xl text-center text-blue-700	 mb-10">Task Board</h1>
      <TaskBoard />
    </div>
  );
}
