import { X } from "lucide-react";
import { useEffect } from "react";

const TaskModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-2 bg-secondary" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-primary">
              Create New Task
            </h2>
            <p className="text-sm text-gray-500">
              Add a task and stay organized
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-full
              hover:bg-red-50
              transition-all
              group
            "
          >
            <X
              size={22}
              className="text-gray-500 group-hover:text-danger"
            />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;