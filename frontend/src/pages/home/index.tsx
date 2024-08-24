import React, {useState} from "react";
import Preview from "../../components/preview";
import All from "../../components/all";
import New from "../../components/new";

const Home:React.FC = () => {
    const [activePage, setActivePage] = useState('preview');
    
    const handleActivePage = () => {
        switch (activePage) {
            case 'preview':
                return <Preview />
            case 'all-posts':
                return <All />
            case 'add-new':
                return <New />
        }
    }
    
    return (
        <div>
            <div className="header">
                <div className="flex justify-center p-2 items-center bg-white border-b-2 border-gray-200">
                    <button
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                        onClick={() => setActivePage('preview')}
                    >
                        Preview
                    </button>
                    <button
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                        onClick={() => setActivePage('all-posts')}
                    >
                        All Posts
                    </button>
                    <button
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                        onClick={() => setActivePage('add-new')}
                    >
                        Add New
                    </button>
                </div>
            </div>
            <div className="content">
                {handleActivePage()}
            </div>
        </div>
    )
}

export default Home