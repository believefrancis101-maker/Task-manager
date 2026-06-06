import { useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskflow-tasks", []);

  const addTask = useCallback((task) => {
    setTasks((prev) => [task, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [setTasks]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <StatsCards tasks={tasks} />
        <TaskForm onAdd={addTask} />
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}
