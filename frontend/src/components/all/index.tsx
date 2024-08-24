import React, { useEffect, useState } from "react";
import axios from "axios";
import Delete from "../modal/delete";
import Update from "../modal/update";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface AllProps {
    id: number;
    title: string;
    content: string;
    category: string;
    status: string;
}

const All: React.FC = () => {
    const [activeTabs, setActiveTabs] = useState('published');
    const [publishedData, setPublishedData] = useState<AllProps[]>([]);
    const [draftData, setDraftData] = useState<AllProps[]>([]);
    const [trashedData, setTrashedData] = useState<AllProps[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<null | 'delete' | 'edit'>(null);
    const [selectedItem, setSelectedItem] = useState<AllProps | null>(null);

    const getClassNames = (tab: string): string => {
        return `inline-block p-4 border-b-2 rounded-t-lg ${activeTabs === tab ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-blue-600 hover:border-blue-300'}`;
    }

    const fetchDataByStatus = async () => {
        try {
            let api_url = process.env.REACT_APP_API_URL;
            if (api_url === "localhost:3001") {
                api_url = "http://" + api_url;
            }
            const response = await axios.get(`${api_url}/article/`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const dataPublish: AllProps[] = [];
            const dataDraft: AllProps[] = [];
            const dataTrashed: AllProps[] = [];
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].status === 'publish') {
                    dataPublish.push(response.data[i]);
                } else if (response.data[i].status === 'draft') {
                    dataDraft.push(response.data[i]);
                } else if (response.data[i].status === 'thrash') {
                    dataTrashed.push(response.data[i]);
                }
            }

            setPublishedData(dataPublish);
            setDraftData(dataDraft);
            setTrashedData(dataTrashed);
        } catch (error) {
            console.log("Error fetching all items: ", error);
        }
    }

    useEffect(() => {
        fetchDataByStatus();
    }, [activeTabs]);

    const handleModal = (type: 'delete' | 'edit', item: AllProps) => {
        setSelectedItem(item);
        setModalType(type);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setModalType(null);
        setSelectedItem(null);
    }

    const handleDelete = async (id: number) => {
        try {
            let api_url = process.env.REACT_APP_API_URL;
            if (api_url === "localhost:3001") {
                api_url = "http://" + api_url;
            }

            await axios.delete(`${api_url}/article/${id}`);
            toast.success('Item deleted successfully');
            fetchDataByStatus();
        } catch (error) {
            toast.error('Failed to delete item');
        } finally {
            handleCloseModal();
        }
    }

    const handleUpdate = async (item: { id: number; title: string; content: string; category: string; status: string }) => {
        try {
            let api_url = process.env.REACT_APP_API_URL;
            if (api_url === "localhost:3001") {
                api_url = "http://" + api_url;
            }

            await axios.put(`${api_url}/article/${item.id}`, item);
            toast.success('Item updated successfully');
            fetchDataByStatus();
        } catch (error) {
            toast.error('Failed to update item');
        } finally {
            handleCloseModal();
        }
    }

    const activeTabContent = () => {
        const renderRows = (data: AllProps[]) => (
            data.map((item) => (
                <tr key={item.id}>
                    <th scope="row" className="px-6 py-3">{item.title}</th>
                    <td className="px-6 py-3">{item.category}</td>
                    <td className="px-6 py-3">
                        <button
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                            onClick={() => handleModal('edit', item)}>
                            Edit
                        </button>
                        {
                            activeTabs !== "trashed" ?
                                <button
                                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                    onClick={() => handleModal('delete', item)}>
                                    Delete
                                </button>
                                :
                                ''
                        }
                    </td>
                </tr>
            ))
        );

        switch (activeTabs) {
            case 'published':
                return (
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-left">
                        <thead className="uppercase bg-gray-800 text-white rounded-2xl mx-5">
                            <tr>
                                <th className="px-6 py-3" scope="col">Title</th>
                                <th className="px-6 py-3" scope="col">Category</th>
                                <th className="px-6 py-3" scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody className="mt-2">
                            {renderRows(publishedData)}
                            </tbody>
                        </table>
                    </div>
                );
            case 'drafts':
                return (
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="uppercase bg-gray-800 text-white rounded-2xl mx-5">
                            <tr>
                                <th className="px-6 py-3" scope="col">Title</th>
                                <th className="px-6 py-3" scope="col">Category</th>
                                <th className="px-6 py-3" scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody className="mt-2">
                            {renderRows(draftData)}
                            </tbody>
                        </table>
                    </div>
                );
            case 'trashed':
                return (
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="uppercase bg-gray-800 text-white rounded-2xl mx-5">
                            <tr>
                                <th className="px-6 py-3" scope="col">Title</th>
                                <th className="px-6 py-3" scope="col">Category</th>
                                <th className="px-6 py-3" scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody className="mt-2">
                            {renderRows(trashedData)}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div>
            <div className="tabs mt-4">
                <ul className="flex flex-wrap -mb-px justify-center">
                    <li className="me-2">
                        <button
                            className={getClassNames("published")}
                            onClick={() => setActiveTabs('published')}>
                            Published
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            className={getClassNames("drafts")}
                            onClick={() => setActiveTabs('drafts')}>
                            Drafts
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            className={getClassNames("trashed")}
                            onClick={() => setActiveTabs('trashed')}>
                            Trashed
                        </button>
                    </li>
                </ul>
            </div>
            <div className="contentAll mt-5">
                {activeTabContent()}
            </div>

            {showModal && modalType === 'delete' && selectedItem && (
                <Delete
                    item={selectedItem}
                    onClose={handleCloseModal}
                    onDelete={() => handleDelete(selectedItem.id)}
                />
            )}

            {showModal && modalType === 'edit' && selectedItem && (
                <Update
                    item={selectedItem}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                />
            )}

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default All;