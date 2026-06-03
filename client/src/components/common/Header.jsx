import { CheckSquare, PlusCircle } from "lucide-react";

const Header = ({ onCreateTask }) => {
  return (
    <header className="bg-primary shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <div className="flex items-center gap-3">
          <CheckSquare className="hidden sm:block w-7 h-7 text-secondary" />

          <div>
            <h1 className="text-white font-bold text-lg sm:text-2xl">
              Task Manager
            </h1>

            <p className="text-gray-300 text-xs sm:text-sm">
              Stay organized and productive
            </p>
          </div>
        </div>

        <button
          onClick={onCreateTask}
          className="btn-secondary flex items-center gap-2"
        >
          <PlusCircle size={18} />

          <span className="hidden sm:inline">
            Create Task
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;