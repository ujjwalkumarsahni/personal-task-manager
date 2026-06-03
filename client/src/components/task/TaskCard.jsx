import React, { useState } from "react";
import { format, isPast, isToday } from "date-fns";
import {
  CheckCircle,
  Circle,
  Edit2,
  Trash2,
  Calendar,
  AlertCircle,
  Clock,
  Save,
  X,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || "",
    dueDate: task.dueDate
      ? format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm")
      : "",
  });

  const isOverdue =
    task.dueDate && !task.completed && isPast(new Date(task.dueDate));
  const isDueToday =
    task.dueDate && !task.completed && isToday(new Date(task.dueDate));

  const getDueDateColor = () => {
    if (isOverdue) return "text-red-500";
    if (isDueToday) return "text-secondary";
    return "text-primary";
  };

  const handleEdit = async () => {
    const success = await onEdit(task._id, {
      title: editData.title,
      description: editData.description || undefined,
      dueDate: editData.dueDate || undefined,
    });
    if (success) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="card p-6 animate-scale-up">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className="input-field text-lg font-semibold"
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            className="input-field"
            rows="2"
            placeholder="Description"
          />
          <input
            type="datetime-local"
            value={editData.dueDate}
            onChange={(e) =>
              setEditData({ ...editData, dueDate: e.target.value })
            }
            className="input-field"
          />
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleEdit}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-outline flex-1 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`card p-5 transition-all duration-300 hover:shadow-xl ${
          isOverdue
            ? "border-l-4 border-l-danger"
            : isDueToday
              ? "border-l-4 border-l-secondary"
              : ""
        }`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggleComplete(task._id)}
            className="shrink-0 mt-1 transition-transform hover:scale-110"
          >
            {task.completed ? (
              <CheckCircle className="w-6 h-6 text-primary" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400 hover:text-secondary" />
            )}
          </button>

          <div className="grow">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`text-lg font-semibold ${
                  task.completed ? "line-through text-gray-400" : "text-primary"
                }`}
              >
                {task.title}
              </h3>

              {!task.completed && (
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="
        p-2 rounded-lg
        text-secondary
        hover:bg-secondary/10
        transition-all
      "
                    title="Edit task"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="
        p-2 rounded-lg
        text-danger
        hover:bg-danger/10
        transition-all
      "
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {task.description && (
              <p
                className={`text-gray-600 mt-2 text-sm ${task.completed ? "line-through" : ""}`}
              >
                {task.description}
              </p>
            )}

            {task.dueDate && (
              <div
                className={`flex items-center gap-2 mt-3 text-sm ${getDueDateColor()}`}
              >
                <span className="font-medium">
                  Due: {format(new Date(task.dueDate), "MMM dd, yyyy hh:mm a")}
                </span>
                {isOverdue && (
                  <span className="bg-danger text-white px-2 py-1 rounded-md text-xs font-medium">
                    Overdue
                  </span>
                )}
                {isDueToday && !isOverdue && (
                  <span className="bg-secondary text-white px-2 py-1 rounded-md text-xs font-medium">
                    Due Today
                  </span>
                )}
              </div>
            )}

            {/* Status Badge */}
            {task.completed && (
              <div className="mt-2">
                <span className="bg-primary text-white px-2 py-1 rounded-md text-xs font-medium">
                  Completed
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => onDelete(task._id)}
      />
    </>
  );
};

export default TaskCard;
