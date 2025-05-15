import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-2 text-center">🙏 Welcome to Zen Bible</h1>
      <p className="text-lg mb-10 text-center text-gray-600">A minimalist Bible app using the Authorised King James Version (KJV)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">📖 Bible Viewer</h2>
          <p className="text-gray-700 mb-4">Read chapters, search verses, and navigate through books of the Bible with ease.</p>
          <button
            onClick={() => navigate('/bible')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Open Bible Viewer
          </button>
        </div>

        <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">⭐ Favourites</h2>
          <p className="text-gray-700 mb-4">Save meaningful verses for easy access and reflection later.</p>
          <button
            onClick={() => navigate('/favourites')}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            View Favourites
          </button>
        </div>

        <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">🌙 Minimalist & Distraction-Free</h2>
          <p className="text-gray-700">Focus on the Word of God without the noise of modern app clutter.</p>
        </div>

        <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">🧩 Open Source KJV</h2>
          <p className="text-gray-700">Built using the Authorised King James Version (KJV). Fully open-source and free to improve.</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
