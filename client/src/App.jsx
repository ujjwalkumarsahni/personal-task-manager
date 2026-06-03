import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { DragDropContext } from "@hello-pangea/dnd";
import { CheckSquare, PlusCircle } from "lucide-react";

import Header from "./components/common/Header.jsx";
import TaskForm from "./components/task/TaskForm.jsx";
import TaskList from "./components/task/TaskList.jsx";
import SearchBar from "./components/filters/SearchBar.jsx";
import FilterBar from "./components/filters/FilterBar.jsx";
import StatsSection from "./components/filters/StatsSection.jsx";
import TaskModal from "./components/task/TaskModal.jsx";
import useTasks from "./hooks/useTasks";

function App() {
  const {
    tasks,
    loading,
    stats,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    fetchTasks,
  } = useTasks();

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [movedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, movedItem);

    await reorderTasks(items);
  };

  const handleCreateTask = async (taskData) => {
    const success = await createTask(taskData);

    if (success) {
      setIsModalOpen(false);
    }

    return success;
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      <Header onCreateTask={() => setIsModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <StatsSection stats={stats} />

        <div className="my-6 space-y-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            onToggleComplete={toggleComplete}
            onEdit={updateTask}
            onDelete={deleteTask}
          />
        </DragDropContext>
      </main>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm onSubmit={handleCreateTask} />
      </TaskModal>
    </div>
  );
}

export default App;
