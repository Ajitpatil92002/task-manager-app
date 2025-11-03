import React from 'react';
import type { Category, Priority } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
    { id: 'cat-1', name: 'Work', color: 'bg-blue-500' },
    { id: 'cat-2', name: 'Personal', color: 'bg-green-500' },
    { id: 'cat-3', name: 'Urgent', color: 'bg-red-500' },
];

export const STATUS_MAP: { [key: string]: string } = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done',
};

export const PRIORITY_MAP: { [key in Priority]: string } = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
};

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <line x1='12' y1='5' x2='12' y2='19'></line>
        <line x1='5' y1='12' x2='19' y2='12'></line>
    </svg>
);

export const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'></path>
    </svg>
);

export const TagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <path d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z'></path>
        <path d='M7 7h.01'></path>
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <polyline points='3 6 5 6 21 6'></polyline>
        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
        <line x1='10' y1='11' x2='10' y2='17'></line>
        <line x1='14' y1='11' x2='14' y2='17'></line>
    </svg>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
        <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
    </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({
    className,
}) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
        <polyline points='22 4 12 14.01 9 11.01'></polyline>
    </svg>
);

export const CircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <circle cx='12' cy='12' r='10'></circle>
    </svg>
);

export const LoaderIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
);

export const LayoutGridIcon: React.FC<{ className?: string }> = ({
    className,
}) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <rect width='7' height='7' x='3' y='3' rx='1' />
        <rect width='7' height='7' x='14' y='3' rx='1' />
        <rect width='7' height='7' x='14' y='14' rx='1' />
        <rect width='7' height='7' x='3' y='14' rx='1' />
    </svg>
);

export const ListIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <line x1='8' x2='21' y1='6' y2='6' />
        <line x1='8' x2='21' y1='12' y2='12' />
        <line x1='8' x2='21' y1='18' y2='18' />
        <line x1='3' x2='3.01' y1='6' y2='6' />
        <line x1='3' x2='3.01' y1='12' y2='12' />
        <line x1='3' x2='3.01' y1='18' y2='18' />
    </svg>
);

export const TableIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <path d='M12 3v18' />
        <rect width='18' height='18' x='3' y='3' rx='2' />
        <path d='M3 9h18' />
        <path d='M3 15h18' />
    </svg>
);

export const CalendarIcon: React.FC<{ className?: string }> = ({
    className,
}) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
        <line x1='16' y1='2' x2='16' y2='6'></line>
        <line x1='8' y1='2' x2='8' y2='6'></line>
        <line x1='3' y1='10' x2='21' y2='10'></line>
    </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <line x1='3' y1='12' x2='21' y2='12'></line>
        <line x1='3' y1='6' x2='21' y2='6'></line>
        <line x1='3' y1='18' x2='21' y2='18'></line>
    </svg>
);

export const FlagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
    >
        <path d='M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z'></path>
        <line x1='4' y1='22' x2='4' y2='15'></line>
    </svg>
);
