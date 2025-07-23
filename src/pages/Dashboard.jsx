// Dashboard.jsx

import React from 'react';
import DashboardNavbar from '../components/DashboradNavbar';


const Dashboard = () => {
    const userName = "User  Name";

    const handleLogout = () => {
        window.location.href = '/';
    };

    return (
        <div>
            {/* <DashboardNavbar userName={userName} onLogout={handleLogout} /> */}
            <div>
                {/* dashboard content */}
            </div>
        </div>
    );
};

export default Dashboard;
