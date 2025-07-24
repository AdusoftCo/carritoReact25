// Dashboard.jsx

import React from 'react';
import DashboardNavbar from '../components/DashboradNavbar';

const Dashboard = () => {
    const userName = "Admin ";

    const handleLogout = () => {
        // Add your logout logic here (e.g., clearing tokens, etc.)
        window.location.href = '/'; // Redirect to the home page or login page
    };

    return (
        <div>
            <DashboardNavbar userName={userName} onLogout={handleLogout} />
            <div>
                {/* dashboard content */}
            </div>
        </div>
    );
};

export default Dashboard;
