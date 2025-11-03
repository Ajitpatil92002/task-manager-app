'use client';

import CategoryPage from '@/components/CategoryPage';
import DashboardPage from '@/components/DashboardPage';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import Sidebar from '@/components/Sidebar';
import TaskList from '@/components/TaskList';
import useTasks from '@/hooks/useTasks';
import type { Category, Page, Priority, Status, Task, View } from '@/lib/types';
import React, { useEffect, useState } from 'react';

const CategoryColors = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
];

const App: React.FC = () => {
    const {
        tasks,
        groups,
        categories,
        addTask,
        updateTask,
        deleteTask,
        addGroup,
        addCategory,
        updateCategory,
        deleteCategory,
        addTaskLoading,
        addTaskError,
        addGroupLoading,
        addGroupError,
        addCategoryLoading,
        addCategoryError,
        updateCategoryLoading,
        updateCategoryError,
        deleteCategoryLoading,
        deleteCategoryError,
    } = useTasks();

    const [selectedGroupId, setSelectedGroupId] = useState<string>('general');
    const [view, setView] = useState<View>('kanban');
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);
    const [isGroupModalOpen, setGroupModalOpen] = useState(false);
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [confirmModalState, setConfirmModalState] = useState<{
        isOpen: boolean;
        message: string;
        onConfirm: () => void;
    }>({ isOpen: false, message: '', onConfirm: () => {} });

    const [editingCategoryIds, setEditingCategoryIds] = useState<Set<string>>(
        new Set()
    );
    const [deletingCategoryIds, setDeletingCategoryIds] = useState<Set<string>>(
        new Set()
    );
    const [errorCategories, setErrorCategories] = useState<Map<string, string>>(
        new Map()
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
                return;
            }

            let handled = false;
            switch (e.key.toLowerCase()) {
                case 'n':
                    if (currentPage === 'tasks') {
                        handleOpenTaskModal();
                        handled = true;
                    }
                    break;
                case 'g':
                    setGroupModalOpen(true);
                    handled = true;
                    break;
                case 'c':
                    handleOpenCategoryModal();
                    handled = true;
                    break;
            }

            if (handled) {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPage]);

    const showConfirmModal = (message: string, onConfirm: () => void) => {
        setConfirmModalState({
            isOpen: true,
            message,
            onConfirm: () => {
                onConfirm();
                hideConfirmModal();
            },
        });
    };

    const hideConfirmModal = () => {
        setConfirmModalState({
            isOpen: false,
            message: '',
            onConfirm: () => {},
        });
    };

    const handleDeleteTask = (taskId: string) => {
        showConfirmModal('Are you sure you want to delete this task?', () =>
            deleteTask(taskId)
        );
    };

    const handleDeleteCategory = (categoryId: string) => {
        showConfirmModal(
            'Are you sure you want to delete this category? Tasks using this category will not be deleted.',
            () => deleteCategory(categoryId)
        );
    };

    const handleOpenTaskModal = (task: Task | null = null) => {
        setEditingTask(task);
        setTaskModalOpen(true);
    };

    const handleCloseTaskModal = () => {
        setEditingTask(null);
        setTaskModalOpen(false);
    };

    const handleOpenCategoryModal = (category: Category | null = null) => {
        setEditingCategory(category);
        setCategoryModalOpen(true);
    };

    const handleCloseCategoryModal = () => {
        setEditingCategory(null);
        setCategoryModalOpen(false);
    };

    const updateCategoryWrapper = async (
        categoryId: string,
        updates: Partial<Category>
    ) => {
        setEditingCategoryIds(prev => new Set(prev).add(categoryId));
        setErrorCategories(prev => {
            const newMap = new Map(prev);
            newMap.delete(categoryId);
            return newMap;
        });
        try {
            await updateCategory(categoryId, updates);
        } catch (error) {
            const message =
                (error as Error).message || 'Failed to update category';
            setErrorCategories(prev => new Map(prev).set(categoryId, message));
        } finally {
            setEditingCategoryIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(categoryId);
                return newSet;
            });
        }
    };

    const deleteCategoryWrapper = async (categoryId: string) => {
        setDeletingCategoryIds(prev => new Set(prev).add(categoryId));
        setErrorCategories(prev => {
            const newMap = new Map(prev);
            newMap.delete(categoryId);
            return newMap;
        });
        try {
            await deleteCategory(categoryId);
        } catch (error) {
            const message =
                (error as Error).message || 'Failed to delete category';
            setErrorCategories(prev => new Map(prev).set(categoryId, message));
        } finally {
            setDeletingCategoryIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(categoryId);
                return newSet;
            });
        }
    };

    const selectedGroup = groups.find(g => g.id === selectedGroupId) || {
        id: 'general',
        name: 'General',
    };
    const tasksForGroup = tasks.filter(
        task => task.groupId === selectedGroupId
    );

    return (
        <div className='flex h-screen bg-gray-100 text-gray-900 font-sans'>
            {isSidebarOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden='true'
                ></div>
            )}
            <Sidebar
                groups={groups}
                selectedGroupId={selectedGroupId}
                setSelectedGroupId={setSelectedGroupId}
                onAddGroup={() => setGroupModalOpen(true)}
                onAddCategory={() => handleOpenCategoryModal()}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <main className='flex-1 flex flex-col overflow-hidden'>
                <Header
                    currentPage={currentPage}
                    groupName={selectedGroup.name}
                    onAddTask={() => handleOpenTaskModal()}
                    currentView={view}
                    onViewChange={setView}
                    onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                />
                {currentPage === 'dashboard' && (
                    <DashboardPage tasks={tasks} categories={categories} />
                )}
                {currentPage === 'tasks' && (
                    <TaskList
                        view={view}
                        tasks={tasksForGroup}
                        categories={categories}
                        onUpdateTask={updateTask}
                        onDeleteTask={handleDeleteTask}
                        onEditTask={handleOpenTaskModal}
                    />
                )}
                {currentPage === 'categories' && (
                    <CategoryPage
                        categories={categories}
                        onEditCategory={handleOpenCategoryModal}
                        onDeleteCategory={handleDeleteCategory}
                        editingCategoryIds={editingCategoryIds}
                        deletingCategoryIds={deletingCategoryIds}
                        errorCategories={errorCategories}
                    />
                )}
            </main>

            {isTaskModalOpen && (
                <TaskModal
                    isOpen={isTaskModalOpen}
                    onClose={handleCloseTaskModal}
                    onSave={taskData => {
                        if (editingTask) {
                            updateTask(editingTask.id, taskData);
                        } else {
                            addTask({ ...taskData, groupId: selectedGroupId });
                        }
                        handleCloseTaskModal();
                    }}
                    categories={categories}
                    task={editingTask}
                    loading={addTaskLoading}
                    error={addTaskError}
                />
            )}

            {isGroupModalOpen && (
                <GroupModal
                    isOpen={isGroupModalOpen}
                    onClose={() => setGroupModalOpen(false)}
                    onSave={name => {
                        addGroup(name);
                        setGroupModalOpen(false);
                    }}
                    loading={addGroupLoading}
                    error={addGroupError}
                />
            )}

            {isCategoryModalOpen && (
                <CategoryModal
                    isOpen={isCategoryModalOpen}
                    onClose={handleCloseCategoryModal}
                    onSave={(name, color) => {
                        if (editingCategory) {
                            updateCategoryWrapper(editingCategory.id, {
                                name,
                                color,
                            });
                        } else {
                            addCategory(name, color);
                        }
                        handleCloseCategoryModal();
                    }}
                    category={editingCategory}
                    loading={addCategoryLoading}
                    error={addCategoryError}
                />
            )}

            {confirmModalState.isOpen && (
                <ConfirmModal
                    isOpen={confirmModalState.isOpen}
                    onClose={hideConfirmModal}
                    onConfirm={confirmModalState.onConfirm}
                    message={confirmModalState.message}
                />
            )}
        </div>
    );
};

// --- Modals ---
interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (taskData: Omit<Task, 'id' | 'groupId'>) => void;
    categories: Category[];
    task: Task | null;
}

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (taskData: Omit<Task, 'id' | 'groupId'>) => void;
    categories: Category[];
    task: Task | null;
    loading?: boolean;
    error?: string | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    onClose,
    onSave,
    categories,
    task,
    loading = false,
    error = null,
}) => {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState<Status>(task?.status || 'todo');
    const [categoryId, setCategoryId] = useState(task?.categoryId || '');
    const [date, setDate] = useState(task?.date || '');
    const [priority, setPriority] = useState<Priority>(
        task?.priority || 'medium'
    );

    React.useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (['INPUT', 'TEXTAREA'].includes(target.tagName)) {
                return;
            }

            const statusOrder: Status[] = ['todo', 'inprogress', 'done'];
            const priorityOrder: Priority[] = ['high', 'medium', 'low'];

            let handled = false;
            switch (e.key.toLowerCase()) {
                case 's':
                    setStatus(currentStatus => {
                        const currentIndex = statusOrder.indexOf(currentStatus);
                        const nextIndex =
                            (currentIndex + 1) % statusOrder.length;
                        return statusOrder[nextIndex];
                    });
                    handled = true;
                    break;
                case 'p':
                    setPriority(currentPriority => {
                        const currentIndex =
                            priorityOrder.indexOf(currentPriority);
                        const nextIndex =
                            (currentIndex + 1) % priorityOrder.length;
                        return priorityOrder[nextIndex];
                    });
                    handled = true;
                    break;
            }

            if (handled) {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSave({
                title,
                description,
                status,
                categoryId: categoryId || undefined,
                date: date || undefined,
                priority,
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={task ? 'Edit Task' : 'Add Task'}
        >
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-500'>
                        Title
                    </label>
                    <input
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        required
                        autoFocus
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-500'>
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={3}
                        className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        disabled={loading}
                    ></textarea>
                </div>
                <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
                    <div className='flex-1'>
                        <label className='block text-sm font-medium text-gray-500'>
                            Category
                        </label>
                        <select
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            disabled={loading}
                        >
                            <option value=''>None</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1'>
                        <label className='block text-sm font-medium text-gray-500'>
                            Date
                        </label>
                        <input
                            type='date'
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
                    <div className='flex-1'>
                        <label className='block text-sm font-medium text-gray-500'>
                            Status{' '}
                            <span className='text-xs text-gray-400'>(s)</span>
                        </label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value as Status)}
                            className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            disabled={loading}
                        >
                            <option value='todo'>To Do</option>
                            <option value='inprogress'>In Progress</option>
                            <option value='done'>Done</option>
                        </select>
                    </div>
                    <div className='flex-1'>
                        <label className='block text-sm font-medium text-gray-500'>
                            Priority{' '}
                            <span className='text-xs text-gray-400'>(p)</span>
                        </label>
                        <select
                            value={priority}
                            onChange={e =>
                                setPriority(e.target.value as Priority)
                            }
                            className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            disabled={loading}
                        >
                            <option value='high'>High</option>
                            <option value='medium'>Medium</option>
                            <option value='low'>Low</option>
                        </select>
                    </div>
                </div>
                {error && <p className='text-sm text-red-600'>{error}</p>}
                <div className='flex justify-end pt-4'>
                    <button
                        type='button'
                        onClick={onClose}
                        disabled={loading}
                        className='bg-gray-200 text-gray-900 py-2 px-4 rounded-md mr-2'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-indigo-600 text-white py-2 px-4 rounded-md'
                    >
                        {loading ? 'Saving...' : task ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

interface GroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
    loading?: boolean;
    error?: string | null;
}

const GroupModal: React.FC<GroupModalProps> = ({
    isOpen,
    onClose,
    onSave,
    loading = false,
    error = null,
}) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name);
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Add Group'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-500'>
                        Group Name
                    </label>
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        required
                        autoFocus
                        disabled={loading}
                    />
                </div>
                {error && <p className='text-sm text-red-600'>{error}</p>}
                <div className='flex justify-end pt-4'>
                    <button
                        type='button'
                        onClick={onClose}
                        disabled={loading}
                        className='bg-gray-200 text-gray-900 py-2 px-4 rounded-md mr-2'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-indigo-600 text-white py-2 px-4 rounded-md'
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string, color: string) => void;
    category: Category | null;
    loading?: boolean;
    error?: string | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    isOpen,
    onClose,
    onSave,
    category,
    loading = false,
    error = null,
}) => {
    const [name, setName] = useState(category?.name || '');
    const [selectedColor, setSelectedColor] = useState(
        category?.color || CategoryColors[0]
    );

    useEffect(() => {
        if (isOpen) {
            setName(category?.name || '');
            setSelectedColor(category?.color || CategoryColors[0]);
        }
    }, [isOpen, category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name, selectedColor);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={category ? 'Edit Category' : 'Add Category'}
        >
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-500'>
                        Category Name
                    </label>
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        required
                        autoFocus
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-500'>
                        Color
                    </label>
                    <div className='mt-2 flex flex-wrap gap-2'>
                        {CategoryColors.map(color => (
                            <button
                                type='button'
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full ${color} ${
                                    selectedColor === color
                                        ? 'ring-2 ring-offset-2 ring-offset-gray-100 ring-indigo-500'
                                        : ''
                                }`}
                                disabled={loading}
                            ></button>
                        ))}
                    </div>
                </div>
                {error && <p className='text-sm text-red-600'>{error}</p>}
                <div className='flex justify-end pt-4'>
                    <button
                        type='button'
                        onClick={onClose}
                        disabled={loading}
                        className='bg-gray-200 text-gray-900 py-2 px-4 rounded-md mr-2'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-indigo-600 text-white py-2 px-4 rounded-md'
                    >
                        {category ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    title?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    message,
    title = 'Confirm Deletion',
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div>
                <p className='text-gray-600'>{message}</p>
                <div className='flex justify-end pt-6 space-x-2'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 rounded-md font-medium transition-colors'
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        onClick={onConfirm}
                        className='bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-md font-medium transition-colors'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default App;
