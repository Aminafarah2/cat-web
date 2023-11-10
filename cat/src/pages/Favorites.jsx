import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { catOptions } from '../option';

function Favorites() {
  const [favorites, setFavorites] = useState([]); // Change to an array to store favorites
  const [catData, setCatData] = useState([]);

  const fetchData = () => {
    axios
      .get(
        `https://api.thecatapi.com/v1/favourites?sub_id=my-user-1`,
        catOptions
      )
      .then((response) => setFavorites(response.data));
  };

  const populateArray = () => {
    favorites.map((favorite) => {
      axios
        .get(
          `https://api.thecatapi.com/v1/images/${favorite.image_id}`,
          catOptions
        )
        .then((response) =>
          setCatData((fulldata) => [...fulldata, response.data])
        );
    });
  };

  const handleAddToFavorites = (imageId) => {
    // Add the selected cat to favorites
    axios
      .post(
        `https://api.thecatapi.com/v1/favourites`,
        { image_id: imageId, sub_id: 'my-user-1' },
        catOptions
      )
      .then((response) => {
        setFavorites([...favorites, response.data]);
      });
  };

  useEffect(() => {
    fetchData();
    populateArray();
  }, []);

  return (
    <section className="favorite-container">
      <h1 className="favorite-image-title">Favorites</h1>
      <button className="favorites-button" onClick={populateArray}>
        Load favorites
      </button>
      <div className="favorite-image-grid">
        {catData?.slice(0, 6).map((cat) => (
          <div className="image-button-pair" key={cat.image_id}>
            <div> {cat.image_id}</div>
            <img className="grid-image" src={cat.url} alt="" />
            <button onClick={() => handleAddToFavorites(cat.image_id)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Favorites;
