// src/components/StartPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-black">
      <h1 className="text-5xl font-bold mb-6">Welcome to the Zen Bible</h1>
      <p className="text-lg mb-4">A minimalist app to help you focus on God's Word without distractions.</p>
      <Link to="/bible" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">Start Reading</Link>
    </div>
  );
};

export default StartPage;
