import React, { useState, useEffect } from 'react';

const BibleViewer = () => {
  const [verses, setVerses] = useState([]);
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [search, setSearch] = useState('');

  // Fetch Bible verses from the API when book or chapter changes
  useEffect(() => {
    fetch(`/api/bible/${selectedBook}/${selectedChapter}`)
      .then(res => res.json())
      .then(data => setVerses(data))
      .catch(err => console.error('Error fetching data:', err));
  }, [selectedBook, selectedChapter]);

  // Filter verses based on search input
  const filteredVerses = verses.filter((verse) =>
    verse.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">📖 Bible Viewer</h1>

      {/* Dropdowns for Book and Chapter Selection */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="w-full md:w-1/3 p-2 border"
        >
          {/* List of Books */}
          <option value="Genesis">Genesis</option>
          <option value="Exodus">Exodus</option>
          {/* Add more books as needed */}
        </select>

        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="w-full md:w-1/3 p-2 border"
        >
          {/* Example chapter options */}
          <option value={1}>Chapter 1</option>
          <option value={2}>Chapter 2</option>
        </select>

        <input
          type="text"
          placeholder="Search verses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-2 border"
        />
      </div>

      {/* Display Bible verses */}
      <div className="space-y-4">
        {filteredVerses.length > 0 ? (
          filteredVerses.map((verse) => (
            <div
              key={verse.verse}
              className="p-4 border rounded shadow bg-white hover:bg-gray-50"
            >
              <strong className="block mb-2">Verse {verse.verse}</strong>
              <p>{verse.text}</p>
            </div>
          ))
        ) : (
          <p>No verses available for this chapter.</p>
        )}
      </div>
    </div>
  );
};

export default BibleViewer;
