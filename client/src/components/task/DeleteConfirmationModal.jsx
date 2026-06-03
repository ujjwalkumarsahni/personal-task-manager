import React from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
      "
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-2 bg-danger" />
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-danger/10 p-3 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-danger" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">Delete Task</h3>

              <p className="text-sm text-gray-500">
                This action cannot be undone
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              hover:bg-red-50
              transition-all
              group
            "
          >
            <X size={20} className="text-gray-500 group-hover:text-danger" />
          </button>
        </div>
        <div className="px-6 py-5">
          <p className="text-gray-600 leading-relaxed">
            Are you sure you want to delete this task? This action is permanent
            and cannot be recovered later.
          </p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="
              flex-1
              border border-gray-200
              text-gray-700
              py-3
              rounded-xl
              font-medium
              hover:bg-gray-50
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              flex-1
              bg-danger
              text-white
              py-3
              rounded-xl
              font-medium
              flex items-center justify-center gap-2
              hover:opacity-90
              transition
            "
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
