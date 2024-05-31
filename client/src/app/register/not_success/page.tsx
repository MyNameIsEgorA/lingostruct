import React from 'react';

const SuccessPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-indigo-900">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-orange-500 mb-4">Not Success</h1>
                <p className="text-lg text-gray-700">Something went wrong during registration</p>
            </div>
        </div>
    );
};

export default SuccessPage;