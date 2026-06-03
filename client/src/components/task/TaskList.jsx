import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import Loader from "../common/Loader.jsx";
import EmptyState from "../common/EmptyState.jsx";

import TaskCard from "./TaskCard.jsx";

const TaskList = ({ tasks, loading, onToggleComplete, onEdit, onDelete }) => {
  if (loading) {
    return <Loader />;
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-4"
        >
          {tasks.map((task, index) => (
            <Draggable
              key={task._id}
              draggableId={String(task._id)}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className={`
        transition-all duration-200
        ${snapshot.isDragging ? "rotate-1 scale-[1.02] shadow-2xl z-50" : ""}
      `}
                >
                  <div className="relative group">
                    {/* Drag Handle */}
                    <button
                      {...provided.dragHandleProps}
                      className="
            absolute top-5 right-23 z-10
            flex items-center justify-center
            w-8 h-8
            rounded-lg
            bg-primary/70
            text-white
            transition-all
            opacity-100
            sm:opacity-0
            sm:group-hover:opacity-100
          "
                      title="Drag task"
                    >
                      <GripVertical className="w-4 h-4" />
                    </button>

                    <TaskCard
                      task={task}
                      onToggleComplete={onToggleComplete}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
