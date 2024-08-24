import React from 'react';

interface DeleteProps {
    item: {
        id: number;
        title: string;
    };
    onClose: () => void;
    onDelete: () => void;
}

const Delete: React.FC<DeleteProps> = ({ item, onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Confirm Deletion
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Are you sure you want to delete the item <strong>{item.title}</strong>? This action cannot be undone.
                    </p>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md px-4 py-2 mr-3"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-md px-4 py-2"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Delete;