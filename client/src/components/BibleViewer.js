import React, { useState, useEffect } from 'react';

const BibleViewer = () => {
  const [bible, setBible] = useState({});
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));

  useEffect(() => {
    fetch('/bible.json')
      .then(res => res.json())
      .then(data => {
        setBible(data);
        const bookList = Object.keys(data);
        setBooks(bookList);
        setSelectedBook(bookList[0]);
      })
      .catch(() => setBible({}));
  }, []);

  useEffect(() => {
    if (selectedBook && bible[selectedBook]) {
      const chapterList = Object.keys(bible[selectedBook]);
      setChapters(chapterList);
      setSelectedChapter(chapterList[0]);
    }
  }, [selectedBook, bible]);

  useEffect(() => {
    if (selectedBook && selectedChapter && bible[selectedBook]?.[selectedChapter]) {
      const chapterVerses = bible[selectedBook][selectedChapter];
      const verseList = Object.entries(chapterVerses).map(([num, text]) => ({
        verse: num,
        text,
      }));
      setVerses(verseList);
    } else {
      setVerses([]);
    }
  }, [selectedBook, selectedChapter, bible]);

  const toggleFavorite = (verseKey) => {
    const updated = favorites.includes(verseKey)
      ? favorites.filter(v => v !== verseKey)
      : [...favorites, verseKey];

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6">📖 Bible Viewer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="p-2 border rounded"
        >
          {books.map(book => (
            <option key={book} value={book}>{book}</option>
          ))}
        </select>

        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="p-2 border rounded"
        >
          {chapters.map(ch => (
            <option key={ch} value={ch}>Chapter {ch}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border p-4 rounded shadow space-y-3 leading-relaxed">
        {verses.map(({ verse, text }) => {
          const verseKey = `${selectedBook}-${selectedChapter}-${verse}`;
          return (
            <span
              key={verseKey}
              onClick={() => toggleFavorite(verseKey)}
              className={`block cursor-pointer ${favorites.includes(verseKey) ? 'bg-yellow-200' : ''}`}
            >
              <sup className="text-blue-600 mr-1">{verse}</sup>
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default BibleViewer;
