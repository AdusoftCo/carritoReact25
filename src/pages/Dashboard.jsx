// Dashboard.jsx

import React from 'react';
import DashboardNavbar from '../components/DashboradNavbar';
import CrudProductos from '../components/CrudProducts';

const Dashboard = () => {
    const userName = "Admin ";

    const handleLogout = () => {
        // Add your logout logic here (e.g., clearing tokens, etc.)
        window.location.href = '/'; // Redirect to the home page or login page
    };

    return (
        <div>
            <DashboardNavbar userName={userName} onLogout={handleLogout} />
            <div className="container mt-4">
                <CrudProductos />
            </div>
        </div>
    );
};

export default Dashboard;
