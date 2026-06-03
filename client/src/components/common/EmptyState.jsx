import React from 'react';
import { ClipboardList, Sparkles } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="inline-flex items-center justify-center w-28 h-28 bg-linear-to-br from-primary/10 to-secondary/10 rounded-full mb-5">
        <ClipboardList className="w-14 h-14 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-primary mb-2">No tasks found</h3>
      <p className="text-gray-500 mb-5">Get started by creating your first task</p>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 text-secondary font-medium">
          <span>Use the form above to add a task</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;