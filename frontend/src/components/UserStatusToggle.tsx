import React, { useState } from 'react';
import UserStatusToggle from './UserStatusToggle';

const UserStatusPage: React.FC = () => {
    const [userStatus, setUserStatus] = useState<'active' | 'blocked'>('active');

    const handleStatusChange = (newStatus: 'active' | 'blocked') => {
        setUserStatus(newStatus);
        console.log(`User status changed to: ${newStatus}`);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <h1 className="text-2xl font-bold text-indigo-500 mb-4">User Status</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                    <p className="text-gray-300">Current Status: {userStatus}</p>
                    <UserStatusToggle
                        currentStatus={userStatus}
                        onStatusChange={handleStatusChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserStatusPage;