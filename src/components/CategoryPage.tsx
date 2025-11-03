import { EditIcon, TrashIcon } from '@/lib/constants';
import type { Category } from '@/lib/types';
import React from 'react';

interface CategoryPageProps {
    categories: Category[];
    onEditCategory: (category: Category) => void;
    onDeleteCategory: (id: string) => void;
    editingCategoryIds?: Set<string>;
    deletingCategoryIds?: Set<string>;
    errorCategories?: Map<string, string>;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
    categories,
    onEditCategory,
    onDeleteCategory,
    editingCategoryIds = new Set(),
    deletingCategoryIds = new Set(),
    errorCategories = new Map(),
}) => {
    return (
        <div className='flex-1 overflow-y-auto p-4 sm:p-6'>
            <div className='max-w-2xl mx-auto bg-white p-6 rounded-lg shadow'>
                <h3 className='text-xl font-bold text-gray-800 mb-4'>
                    Categories
                </h3>
                <div className='space-y-2'>
                    {categories.length > 0 ? (
                        categories.map(cat => {
                            const isEditing = editingCategoryIds.has(cat.id);
                            const isDeleting = deletingCategoryIds.has(cat.id);
                            const errorMessage =
                                errorCategories.get(cat.id) || null;
                            return (
                                <div
                                    key={cat.id}
                                    className='flex items-center justify-between p-3 bg-white rounded-md border hover:bg-gray-50 transition-colors duration-150'
                                >
                                    <div className='flex items-center'>
                                        <span
                                            className={`w-4 h-4 rounded-full mr-4 ${cat.color}`}
                                        ></span>
                                        <span className='font-medium text-gray-700'>
                                            {cat.name}
                                        </span>
                                    </div>
                                    <div className='flex items-center space-x-4'>
                                        <button
                                            onClick={() => onEditCategory(cat)}
                                            className='text-gray-400 hover:text-indigo-500'
                                            title='Edit Category'
                                            disabled={isEditing || isDeleting}
                                        >
                                            <EditIcon className='w-5 h-5' />
                                        </button>
                                        <button
                                            onClick={() =>
                                                onDeleteCategory(cat.id)
                                            }
                                            className='text-gray-400 hover:text-red-500'
                                            title='Delete Category'
                                            disabled={isEditing || isDeleting}
                                        >
                                            <TrashIcon className='w-5 h-5' />
                                        </button>
                                    </div>
                                    {errorMessage && (
                                        <p className='text-sm text-red-600 ml-4'>
                                            {errorMessage}
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className='text-center text-gray-500 py-4'>
                            No categories found. Add one to get started!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
