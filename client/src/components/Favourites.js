import React, { useEffect, useState } from 'react';

const Favourites = () => {
  const [bible, setBible] = useState({});
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  useEffect(() => {
    fetch('/bible.json')
      .then(res => res.json())
      .then(data => setBible(data));
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">⭐ Favourite Verses</h1>

      <div className="space-y-4">
        {favorites.map((id) => {
          if (typeof id !== 'string') return null;
          const [book, chapter, verse] = id.split('-');
          const text = bible?.[book]?.[chapter]?.[verse];

          return text ? (
            <div key={id} className="p-4 border rounded bg-white shadow">
              <p><strong>{book} {chapter}:{verse}</strong> — {text}</p>
              <button
                onClick={() => removeFavorite(id)}
                className="text-red-600 text-sm mt-2 underline"
              >
                Remove
              </button>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Favourites;
