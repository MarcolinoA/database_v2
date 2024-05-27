import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./ExercisesSearchBarStyle.css";
import axios from 'axios';

const ExercisesSearchBar = ({ onSearch }) => {
  const [loading, setLoading] = useState(false); // State variable for loading status
  const [searchTerm, setSearchTerm] = useState(""); // State variable for search term
  
  // Function to handle click on search icon
  const handleSearchClick = async (name) => {
    setLoading(true); // Set loading status to true
    try {
      const response = await axios.get( // Send GET request to search exercises by name
        `http://localhost:5554/exercises/names/${name}`
      );
  
      setLoading(false); // Set loading status to false after successful data retrieval
      onSearch(response.data.data); // Pass found exercises to the onSearch function
    } catch (error) {
      console.log(error); // Log error to console
      setLoading(false); // Set loading status to false in case of error
    }
  };
  
  // Function to handle change in search input value
  const handleChange = (event) => {
    setSearchTerm(event.target.value); // Update state with the new input value
  };
  
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    handleSearchClick(searchTerm.trim()); // Perform search
  };
  

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-input">
        <input
          type="text"
          placeholder="Cerca..."
          value={searchTerm}
          onChange={handleChange}
          className="input-field"
        />
        <FaSearch className="search-icon" onClick={() => handleSearchClick(searchTerm.trim())}/>
      </div>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default ExercisesSearchBar;
