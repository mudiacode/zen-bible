import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BibleViewer from './components/BibleViewer';
import Favourites from './components/Favourites';

const App = () => (
  <Router>
    <div className="p-4 max-w-5xl mx-auto">
      <nav className="mb-6 flex justify-between">
        <Link to="/" className="text-blue-600 font-semibold">Zen Bible</Link>
        <Link to="/favourites" className="text-blue-600 font-semibold">⭐ Favourites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BibleViewer />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  </Router>
);

export default App;
