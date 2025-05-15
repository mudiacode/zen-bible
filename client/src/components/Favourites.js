import React, { useState, useEffect } from 'react';

const Favourites = () => {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    async function fetchVerses() {
      const results = [];

      for (const id of favorites) {
        const [book, chapter, verse] = id.split('-');
        try {
          const res = await fetch(`http://localhost:5001/api/bible/${book}/${chapter}`);
          const data = await res.json();
          const found = data.find(v => v.verse === parseInt(verse));
          if (found) {
            results.push({ ...found, book });
          }
        } catch {
          // skip on fail
        }
      }

      setVerses(results);
    }

    fetchVerses();
  }, [favorites]);

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">⭐</h1>

        {verses.length === 0 ? (
          <p className="italic text-gray-500">You haven’t favorited any verses yet.</p>
        ) : (
          <ul className="space-y-4">
            {verses.map(v => {
              const id = `${v.book}-${v.chapter}-${v.verse}`;
              return (
                <li key={id} className="bg-white border border-gray-200 rounded-lg p-4 shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-blue-700 font-semibold">{v.book} {v.chapter}:{v.verse}</span>
                    <button onClick={() => removeFavorite(id)} className="text-sm text-red-500">❌</button>
                  </div>
                  <p>{v.text}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favourites;
