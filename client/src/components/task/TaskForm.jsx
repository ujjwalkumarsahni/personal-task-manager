import React, { useState } from "react";
import { Calendar, FileText, Send, AlertCircle } from "lucide-react";

const TaskForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      dueDate: formData.dueDate || undefined,
    };

    const success = await onSubmit(taskData);
    if (success) {
      setFormData({ title: "", description: "", dueDate: "" });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-medium text-sm text-gray-700">
            Task Title <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={100}
            placeholder="Enter task title"
            className="input-field"
          />

          {errors.title && (
            <p className="mt-1 flex items-center gap-1 text-sm text-danger">
              <AlertCircle className="w-4 h-4" />
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label className="font-medium text-sm">Description</label>

          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Task description..."
            className="input-field resize-none"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Due Date</label>

          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
