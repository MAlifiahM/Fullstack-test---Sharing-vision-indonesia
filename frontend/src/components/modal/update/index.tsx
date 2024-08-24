import React, { useState } from 'react';

interface UpdateProps {
    item: {
        id: number;
        title: string;
        content: string;
        category: string;
        status: string;
    };
    onClose: () => void;
    onUpdate: (item: { id: number; title: string; content: string; category: string; status: string }) => void;
}

const Update: React.FC<UpdateProps> = ({ item, onClose, onUpdate }) => {
    const [title, setTitle] = useState(item.title);
    const [content, setContent] = useState(item.content);
    const [category, setCategory] = useState(item.category);

    const handleUpdate = () => {
        onUpdate({ id: item.id, title, content, category, status:item.status });
    };

    const handlePublish = () => {
        onUpdate({ id: item.id, title, content, category, status: 'publish' });
    };

    const handleDraft = () => {
        onUpdate({ id: item.id, title, content, category, status: 'draft' });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Update Item
                    </h2>
                    <form className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                            />
                        </div>
                    </form>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md px-4 py-2 mr-3"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md px-4 py-2 mr-3"
                    >
                        Update
                    </button>
                    <button
                        onClick={handlePublish}
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md px-4 py-2 mr-3"
                    >
                        Publish
                    </button>
                    <button
                        onClick={handleDraft}
                        className="text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md px-4 py-2"
                    >
                        Draft
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Update;