import React, { useState } from "react";
import axios from "axios";

const New: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async () => {
        try {
            let api_url = process.env.REACT_APP_API_URL;
            if (api_url === "localhost:3001") {
                api_url = "http://" + api_url;
            }

            await axios.post(`${api_url}/article/`, {
                title: title,
                content: content,
                category: category,
                status: status,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDraft = () => {
        setStatus("draft");
        handleSubmit();
    };

    const handlePublish = () => {
        setStatus("publish");
        handleSubmit();
    };

    return (
        <div>
            <div className="mt-4 flex justify-center">
                <form onSubmit={handleSubmit} className="w-11/12 border-2 border-gray-800 p-4 rounded-2xl">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-xl text-gray-700">
                            Title
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="shadow-sm focus:ring-indigo-500 px-5 py-2 focus:border-indigo-500 block w-full sm:text-sm border-indigo-300 border-2 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-xl font-medium text-gray-700">
                            Content
                        </label>
                        <div className="mt-1">
                            <textarea
                                name="content"
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="shadow-sm focus:ring-indigo-500 p-5 focus:border-indigo-500 block w-full sm:text-sm border-indigo-300 border-2 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-xl font-medium text-gray-700">
                            Category
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="category"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="shadow-sm focus:ring-indigo-500 px-5 py-2 focus:border-indigo-500 block w-full sm:text-sm border-indigo-300 border-2 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4 justify-end">
                        <button
                            type="submit"
                            onClick={handleDraft}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            onClick={handlePublish}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Publish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default New;