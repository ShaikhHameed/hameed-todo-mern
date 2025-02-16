export const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    return res.json();
  };
  
  export const createTask = async (task) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  };
  
  export const updateTask = async (id, task) => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      body: JSON.stringify({ id, ...task }),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  };
  
  export const deleteTask = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
  };
  