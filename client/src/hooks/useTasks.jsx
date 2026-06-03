import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api.js';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, overdue: 0 });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data);
      await fetchStats();
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/tasks/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks(prev => [response.data.data, ...prev]);
      toast.success('Task created successfully!');
      await fetchStats();
      return true;
    } catch (error) {
      const message = error.response?.data?.errors?.[0]?.msg || 'Failed to create task';
      toast.error(message);
      return false;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      setTasks(prev => prev.map(task => 
        task._id === id ? response.data.data : task
      ));
      toast.success('Task updated successfully');
      await fetchStats();
      return true;
    } catch (error) {
      toast.error('Failed to update task');
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task._id !== id));
      toast.success('Task deleted successfully');
      await fetchStats();
      return true;
    } catch (error) {
      toast.error('Failed to delete task');
      return false;
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await api.patch(`/tasks/${id}/toggle`);
      setTasks(prev => prev.map(task =>
        task._id === id ? response.data.data : task
      ));
      const task = tasks.find(t => t._id === id);
      toast.success(task?.completed ? 'Task marked incomplete' : 'Task completed!');
      await fetchStats();
      return true;
    } catch (error) {
      toast.error('Failed to update task status');
      return false;
    }
  };

  const reorderTasks = async (reorderedTasks) => {
    setTasks(reorderedTasks);
    try {
      await Promise.all(
        reorderedTasks.map((task, index) =>
          api.patch(`/tasks/${task._id}/order`, { order: index })
        )
      );
      toast.success('Task order saved');
    } catch (error) {
      toast.error('Failed to save order');
      await fetchTasks();
    }
  };

  return {
    tasks,
    loading,
    stats,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    fetchTasks,
  };
};

export default useTasks;