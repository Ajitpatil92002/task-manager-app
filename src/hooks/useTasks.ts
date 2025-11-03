import { useState, useEffect } from 'react';
import type { Category, Group, Task } from '@/lib/types';
import { toast } from 'sonner';

const fetcher = async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const res = await fetch(url, opts);
  if (!res.ok) {
    throw new Error('API request failed');
  }
  return res.json();
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Separate loading states for each action
  const [addTaskLoading, setAddTaskLoading] = useState(false);
  const [updateTaskLoading, setUpdateTaskLoading] = useState(false);
  const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);

  const [addGroupLoading, setAddGroupLoading] = useState(false);

  const [addCategoryLoading, setAddCategoryLoading] = useState(false);
  const [updateCategoryLoading, setUpdateCategoryLoading] = useState(false);
  const [deleteCategoryLoading, setDeleteCategoryLoading] = useState(false);

  // Separate error states for each action
  const [addTaskError, setAddTaskError] = useState<string | null>(null);
  const [updateTaskError, setUpdateTaskError] = useState<string | null>(null);
  const [deleteTaskError, setDeleteTaskError] = useState<string | null>(null);

  const [addGroupError, setAddGroupError] = useState<string | null>(null);

  const [addCategoryError, setAddCategoryError] = useState<string | null>(null);
  const [updateCategoryError, setUpdateCategoryError] = useState<string | null>(null);
  const [deleteCategoryError, setDeleteCategoryError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const tasksRes = await fetcher<Task[]>('/api/tasks');
      const groupsRes = await fetcher<Group[]>('/api/groups');
      const categoriesRes = await fetcher<Category[]>('/api/categories');
      setTasks(tasksRes);
      setGroups(groupsRes);
      setCategories(categoriesRes);
      setError(null);
    } catch (err) {
      const message = (err as Error).message || 'Failed to load data';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addTask = async (taskData: Omit<Task, 'id'>) => {
    setAddTaskLoading(true);
    setAddTaskError(null);
    try {
      const newTask = await fetcher<Task>('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      setTasks(prev => [...prev, newTask]);
      toast.success('Task added successfully');
    } catch (err) {
      const message = (err as Error).message || 'Failed to add task';
      setAddTaskError(message);
      toast.error(message);
    } finally {
      setAddTaskLoading(false);
    }
  };

  const updateTask = async (
    taskId: string,
    updates: Partial<Omit<Task, 'id' | 'groupId'>>
  ) => {
    setUpdateTaskLoading(true);
    setUpdateTaskError(null);
    try {
      const updatedTask = await fetcher<Task>(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      setTasks(prev => prev.map(t => (t.id === taskId ? updatedTask : t)));
      toast.success('Task updated successfully');
    } catch (err) {
      const message = (err as Error).message || 'Failed to update task';
      setUpdateTaskError(message);
      toast.error(message);
    } finally {
      setUpdateTaskLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    setDeleteTaskLoading(true);
    setDeleteTaskError(null);
    try {
      await fetcher<void>(`/api/tasks/${taskId}`, { method: 'DELETE' });
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success('Task deleted successfully');
    } catch (err) {
      const message = (err as Error).message || 'Failed to delete task';
      setDeleteTaskError(message);
      toast.error(message);
    } finally {
      setDeleteTaskLoading(false);
    }
  };

  const addGroup = async (name: string) => {
    setAddGroupLoading(true);
    setAddGroupError(null);
    try {
      const newGroup = await fetcher<Group>('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      setGroups(prev => [...prev, newGroup]);
      toast.success('Group added successfully');
    } catch (err) {
      const message = (err as Error).message || 'Failed to add group';
      setAddGroupError(message);
      toast.error(message);
    } finally {
      setAddGroupLoading(false);
    }
  };

  const addCategory = async (name: string, color: string) => {
    setAddCategoryLoading(true);
    setAddCategoryError(null);
    try {
      const newCategory = await fetcher<Category>('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });
      setCategories(prev => [...prev, newCategory]);
      toast.success('Category added successfully');
    } catch (err) {
      const message = (err as Error).message || 'Failed to add category';
      setAddCategoryError(message);
      toast.error(message);
    } finally {
      setAddCategoryLoading(false);
    }
  };

  const updateCategory = async (
    categoryId: string,
    updates: Partial<Omit<Category, 'id'>>
  ) => {
    setUpdateCategoryLoading(true);
    setUpdateCategoryError(null);
    try {
      const updatedCategory = await fetcher<Category>(`/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      setCategories(prev => prev.map(c => (c.id === categoryId ? updatedCategory : c)));
      toast.success('Category updated successfully');
    } catch (err) {
      const message = (err as Error).message || 'Failed to update category';
      setUpdateCategoryError(message);
      toast.error(message);
    } finally {
      setUpdateCategoryLoading(false);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    setDeleteCategoryLoading(true);
    setDeleteCategoryError(null);
    try {
      await fetcher<void>(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      setTasks(prev =>
        prev.map(task =>
          task.categoryId === categoryId ? { ...task, categoryId: undefined } : task
        )
      );
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      toast.success('Category deleted successfully');
    } catch (err) {
      const message = (err as Error).message || 'Failed to delete category';
      setDeleteCategoryError(message);
      toast.error(message);
    } finally {
      setDeleteCategoryLoading(false);
    }
  };

  return {
    tasks,
    groups,
    categories,
    loading,
    error,
    addTaskLoading,
    updateTaskLoading,
    deleteTaskLoading,
    addGroupLoading,
    addCategoryLoading,
    updateCategoryLoading,
    deleteCategoryLoading,
    addTaskError,
    updateTaskError,
    deleteTaskError,
    addGroupError,
    addCategoryError,
    updateCategoryError,
    deleteCategoryError,
    addTask,
    updateTask,
    deleteTask,
    addGroup,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useTasks;
