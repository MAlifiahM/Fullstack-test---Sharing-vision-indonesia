import React, {useEffect, useState} from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

interface PreviewProps {
    id: number;
    title: string;
    content: string;
    category: string;
    status: string;
}

const fetchItems = async (page: number, itemsPerPage: number) => {
    const offset : number = (page-1) * itemsPerPage;
    try {
        let api_url : string = '';
        if (API_URL === "localhost:3001") {
            api_url = "http://" + API_URL
        }
        const response = await axios.get(`${api_url}/article/${itemsPerPage}/${offset}`, {
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                status: "publish"
            }
        });

        return response.data;
    }catch (error) {
        console.log("Error fetch item : ", error)
        return { items: [], total: 0 };
    }
}

const Preview:React.FC = () => {

    const [items, setItems] = useState<PreviewProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const loadItems = async () => {
            const data = await fetchItems(currentPage, itemsPerPage);
            setItems(data.posts);
            setCurrentPage(data.current_page);
            setTotalPages(data.total_page);
        };

        loadItems();
    }, [currentPage, itemsPerPage]);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };
    return (
        <div className="p-4">
            <div className="">
                <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="form-select">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
                {items.map(item => {
                    return (
                        <div key={item.id} className="bg-white border-2 rounded-xl p-4">
                            <div className="font-bold text-xl text-center">
                                {item.title}
                            </div>
                            <div className="text-center pt-2 pb-3">
                                {item.category}
                            </div>
                            <div className="text-left">
                                {item.content}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-4">
                <div className="flex justify-center items-center">
                    <button
                        className="px-3 py-2 mx-1 bg-gray-300 rounded"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </button>
                    <div className="px-4">{currentPage} / {totalPages}</div>
                    <button
                        className="px-3 py-2 mx-1 bg-gray-300 rounded"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Preview