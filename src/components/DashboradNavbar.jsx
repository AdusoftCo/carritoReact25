// DashboardNavbar.jsx

import React from 'react';

const DashboardNavbar = ({ userName, onLogout }) => {
    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            <div className="ml-auto flex items-center space-x-4"> {/* Ensure ml-auto is applied here */}
                <span className="text-gray-700">{userName}</span>
                <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
                    Log out
                </button>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
