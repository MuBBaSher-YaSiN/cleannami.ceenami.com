'use client'

import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return isLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={setIsLoggedIn} />;
};

export default AdminPage;
