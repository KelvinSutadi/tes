import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './FavouritePlaces.css';

const FavouritePlaces = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Fetch favourite places from the API
    fetch('https://jakarta-api.netlify.app/.netlify/functions/app/favourites')
      .then(response => response.json())
      .then(data => {
        setFavourites(data);
      })
      .catch(error => {
        console.error('Error fetching favourites:', error);
      });
  }, []);

  const toggleFavourite = (place) => {
    const isFavourite = favourites.some(fav => fav.id === place.id);

    if (isFavourite) {
      // Remove from favourites
      fetch(`https://jakarta-api.netlify.app/.netlify/functions/app/favourites/${place.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setFavourites(favourites.filter(fav => fav.id !== place.id));
        })
        .catch(error => {
          console.error('Error removing favourite:', error);
        });
    } else {
      // Add to favourites
      fetch('https://jakarta-api.netlify.app/.netlify/functions/app/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(place),
      })
        .then(response => response.json())
        .then(data => {
          setFavourites([...favourites, data]);
        })
        .catch(error => {
          console.error('Error adding favourite:', error);
        });
    }
  };

  return (
    <div className="favourite-places">
      <h2>Favourite Places</h2>
      <ul>
        {favourites.map(place => (
          <li key={place.id}>
            <span>{place.name}</span>
            <img src={place.imageUrl} alt={place.name} />
            <button onClick={() => toggleFavourite(place)} className="favourite-button">
              <i className={`fa ${favourites.some(fav => fav.id === place.id) ? 'fa-heart' : 'fa-heart-o'}`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritePlaces;




