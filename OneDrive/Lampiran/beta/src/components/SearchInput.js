import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchInput.css'; // Ensure this path is correct

const SearchInput = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [carouselData, setCarouselData] = useState([]);
  const [culinaryData, setCulinaryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch carousel data from the API
    fetch("https://jakarta-api.netlify.app/.netlify/functions/app/sight")
      .then((response) => response.json())
      .then((data) => {
        setCarouselData(data.map((item, index) => ({
          name: item.name,
          imageUrl: item.imageUrl,
          index: index,
        })));
      })
      .catch((error) => console.error("Failed to fetch carousel data:", error));

    // Fetch culinary data from the API
    fetch("https://jakarta-api.netlify.app/.netlify/functions/app/culinary")
      .then((response) => response.json())
      .then((data) => {
        setCulinaryData(data.map((item, index) => ({
          name: item.name,
          imageUrl: item.imageUrl,
          index: index + carouselData.length, // Correct index handling
        })));
      })
      .catch((error) => console.error("Failed to fetch culinary data:", error));
  }, []);

  useEffect(() => {
    const filteredCarousel = carouselData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredCulinary = culinaryData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData([...filteredCarousel, ...filteredCulinary]);
  }, [searchQuery, carouselData, culinaryData]);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchItemClick = (index) => {
    navigate('/carousel', { state: { slideIndex: index } });
  };

  return (
    <div className="search-container">
      <div className={`searchBox ${isExpanded ? 'expanded' : ''}`}>
        <input 
          className="searchInput" 
          type="text" 
          placeholder="Search" 
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="searchButton" onClick={toggleSearch}>
          <i className="material-icons">search</i>
        </button>
      </div>
      {isExpanded && searchQuery && (
        <div className="searchResults">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div 
                key={item.index} 
                className="searchItem" 
                onClick={() => handleSearchItemClick(item.index)}
                style={{ cursor: 'pointer' }}
              >
                <img src={item.imageUrl} alt={item.name} />
                <div className="searchItemInfo">
                  <h4>{item.name}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="searchItemInfo">
              <h4>No results found</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
























