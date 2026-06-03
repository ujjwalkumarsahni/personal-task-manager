import Task from '../models/Task.js';
import { validationResult } from 'express-validator';

// Get all tasks
// GET /api/tasks
// Public
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get single task
// GET /api/tasks/:id
// Public
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Create a task
// POST /api/tasks
// Public
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Update a task
// PUT /api/tasks/:id
// Public
const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Toggle task completion
// PATCH /api/tasks/:id/toggle
// Public
const toggleTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    
    task.completed = !task.completed;
    await task.save();
    
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Update task order (for drag and drop)
// PATCH /api/tasks/:id/order
// Public
const updateTaskOrder = async (req, res) => {
  const { order } = req.body;
  
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    
    task.order = order;
    await task.save();
    
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Delete a task
// DELETE /api/tasks/:id
// Public
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    
    await task.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get task statistics
// GET /api/tasks/stats
// Public
const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const activeTasks = await Task.countDocuments({ completed: false });
    const completedTasks = await Task.countDocuments({ completed: true });
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      completed: false,
      dueDate: { $ne: null },
    });
    
    res.status(200).json({
      success: true,
      data: {
        total: totalTasks,
        active: activeTasks,
        completed: completedTasks,
        overdue: overdueTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

export {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    toggleTaskCompletion,
    updateTaskOrder,
    deleteTask,
    getTaskStats,
};