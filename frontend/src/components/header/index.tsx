import React from "react";
import {Link} from "react-router-dom";

const Header:React.FC = () => {
    return (
        <div className="header">
            <div className="flex justify-center p-2 items-center bg-white border-b-2 border-gray-200">
                <button
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2">
                    <Link to="/">Preview</Link></button>
                <button
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2">
                    <Link to="/">All Posts</Link></button>
                <button
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2">
                    <Link to="/">Add New</Link></button>
            </div>
        </div>
    )
}

export default Header;