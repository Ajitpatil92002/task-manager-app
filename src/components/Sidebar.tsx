import { FolderIcon, LayoutGridIcon, PlusIcon, TagIcon } from '@/lib/constants';
import type { Group, Page } from '@/lib/types';
import React from 'react';

interface SidebarProps {
    groups: Group[];
    selectedGroupId: string;
    setSelectedGroupId: (id: string) => void;
    onAddGroup: () => void;
    onAddCategory: () => void;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    groups,
    selectedGroupId,
    setSelectedGroupId,
    onAddGroup,
    onAddCategory,
    currentPage,
    setCurrentPage,
    isOpen,
    onClose,
}) => {
    const handlePageSelect = (page: Page) => {
        setCurrentPage(page);
        onClose();
    };

    const handleGroupSelect = (id: string) => {
        setSelectedGroupId(id);
        setCurrentPage('tasks');
        onClose();
    };

    const NavItem: React.FC<{
        onClick: () => void;
        isSelected: boolean;
        children: React.ReactNode;
    }> = ({ onClick, isSelected, children }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 hover:bg-gray-200'
            }`}
        >
            {children}
        </button>
    );

    return (
        <aside
            className={`transform transition-transform duration-300 ease-in-out flex flex-col p-4 bg-white border-r border-gray-200 absolute md:static h-full z-40 w-64 md:w-auto md:shrink-0 md:translate-x-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className='flex items-center mb-6'>
                <h1 className='text-xl font-bold text-gray-800'>
                    Task Manager
                </h1>
            </div>

            <nav className='flex-1 space-y-1'>
                <div className='px-2 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Main
                </div>
                <NavItem
                    onClick={() => handlePageSelect('dashboard')}
                    isSelected={currentPage === 'dashboard'}
                >
                    <LayoutGridIcon className='w-5 h-5 mr-3' />
                    <span>Dashboard</span>
                </NavItem>

                <div className='px-2 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Groups
                </div>
                {groups.map(group => (
                    <NavItem
                        key={group.id}
                        onClick={() => handleGroupSelect(group.id)}
                        isSelected={
                            currentPage === 'tasks' &&
                            selectedGroupId === group.id
                        }
                    >
                        <FolderIcon className='w-5 h-5 mr-3' />
                        <span>{group.name}</span>
                    </NavItem>
                ))}

                <div className='px-2 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Manage
                </div>
                <NavItem
                    onClick={() => handlePageSelect('categories')}
                    isSelected={currentPage === 'categories'}
                >
                    <TagIcon className='w-5 h-5 mr-3' />
                    <span>Categories</span>
                </NavItem>
            </nav>

            <div className='mt-auto space-y-2'>
                <button
                    onClick={onAddGroup}
                    className='w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-150'
                    title='New Group'
                >
                    <span className='flex items-center'>
                        <PlusIcon className='w-5 h-5 mr-2' />
                        New Group
                    </span>
                    <kbd className='px-1.5 py-0.5 text-xs font-semibold text-indigo-600 bg-white rounded'>
                        G
                    </kbd>
                </button>
                <button
                    onClick={onAddCategory}
                    className='w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-150'
                    title='New Category'
                >
                    <span className='flex items-center'>
                        <TagIcon className='w-5 h-5 mr-2' />
                        New Category
                    </span>
                    <kbd className='px-1.5 py-0.5 text-xs font-semibold text-indigo-600 bg-white rounded'>
                        C
                    </kbd>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
