import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BibleViewer = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [verses, setVerses] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/bible.json')
      .then(res => res.json())
      .then(data => {
        const allBooks = Object.keys(data);
        setBooks(allBooks);
        setSelectedBook(allBooks[0]);
      });
  }, []);

  useEffect(() => {
    if (selectedBook) {
      fetch('/bible.json')
        .then(res => res.json())
        .then(data => {
          const chapterData = data[selectedBook]?.[selectedChapter];
          setVerses(chapterData ? Object.entries(chapterData) : []);
        });
    }
  }, [selectedBook, selectedChapter]);

  const filteredVerses = verses.filter(([_, text]) =>
    text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (verseNum) => {
    const id = `${selectedBook}-${selectedChapter}-${verseNum}`;
    const updated = favorites.includes(id)
      ? favorites.filter(v => v !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-700">📖 Bible Viewer</h1>
        <button
          onClick={() => navigate('/favourites')}
          className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded hover:bg-yellow-50"
        >
          ⭐ View Favourites
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4 italic">
        Click a verse to save it as a favourite.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {books.map(book => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
          <input
            type="number"
            min={1}
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="🔍 Search this chapter..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-2 border border-gray-300 rounded"
      />

      <div className="border border-gray-300 rounded p-4 leading-relaxed space-y-4">
        {filteredVerses.length === 0 ? (
          <p className="text-gray-500 italic">No verses found.</p>
        ) : (
          <p className="space-x-2 flex flex-wrap">
            {filteredVerses.map(([num, text]) => {
              const id = `${selectedBook}-${selectedChapter}-${num}`;
              const isFav = favorites.includes(id);
              return (
                <span
                  key={num}
                  onClick={() => toggleFavorite(num)}
                  className={`cursor-pointer ${isFav ? 'bg-yellow-200' : ''}`}
                >
                  <sup className="text-blue-600 font-bold">{num}</sup> {text}
                </span>
              );
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default BibleViewer;
