import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BibleViewer = () => {
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [verses, setVerses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('bible.json')
      .then(res => res.json())
      .then(data => {
        const availableBooks = Object.keys(data);
        setBooks(availableBooks);
        if (!availableBooks.includes(selectedBook)) {
          setSelectedBook(availableBooks[0]);
        }
      });
  }, []);

  useEffect(() => {
    fetch('bible.json')
      .then(res => res.json())
      .then(data => {
        const bookChapters = data[selectedBook];
        if (bookChapters && bookChapters[selectedChapter]) {
          const chapterVerses = bookChapters[selectedChapter];
          const formattedVerses = Object.entries(chapterVerses).map(([verse, text]) => ({
            book: selectedBook,
            chapter: selectedChapter,
            verse: Number(verse),
            text
          }));
          setVerses(formattedVerses);
        } else {
          setVerses([]);
        }
      })
      .catch(() => setVerses([]));
  }, [selectedBook, selectedChapter]);

  const filtered = verses.filter(v =>
    v.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (verseId) => {
    const updatedFavorites = favorites.includes(verseId)
      ? favorites.filter(id => id !== verseId)
      : [...favorites, verseId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">📖 Bible Viewer</h1>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600 italic">
          ⭐ Click a verse to save it as a favorite.
        </p>
        <button
          className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-1 rounded"
          onClick={() => navigate('/favourites')}
        >
          ⭐ View Favourites
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
          <select
            value={selectedBook}
            onChange={e => setSelectedBook(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white"
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
            onChange={e => setSelectedChapter(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded bg-white"
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="🔍 Search this chapter..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-2 border border-gray-300 rounded bg-white"
      />

      <div className="bg-white border border-gray-200 rounded-lg shadow p-6 leading-relaxed">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 italic">No verses found.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((verse) => (
              <span
                key={verse.verse}
                className={`cursor-pointer inline ${favorites.includes(`${verse.book}-${verse.chapter}-${verse.verse}`) ? 'bg-yellow-200' : ''}`}
                onClick={() => toggleFavorite(`${verse.book}-${verse.chapter}-${verse.verse}`)}
              >
                <sup className="font-bold text-blue-600 mr-1">{verse.verse}</sup>
                {verse.text} 
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BibleViewer;
