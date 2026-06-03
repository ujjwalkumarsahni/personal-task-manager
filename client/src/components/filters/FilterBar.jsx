import React from 'react';
import { ListTodo, Circle, CheckCircle } from 'lucide-react';

const FilterBar = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Tasks', icon: ListTodo, color: 'primary' },
    { id: 'active', label: 'Active', icon: Circle, color: 'secondary' },
    { id: 'completed', label: 'Completed', icon: CheckCircle, color: 'primary' },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = currentFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`sm:px-3 px-2 sm:py-2 py-1.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              isActive
                ? filter.color === 'primary'
                  ? 'bg-primary text-white shadow-md'
                  : filter.color === 'secondary'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;