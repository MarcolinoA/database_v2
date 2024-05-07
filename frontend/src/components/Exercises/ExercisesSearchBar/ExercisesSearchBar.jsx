import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./ExercisesSearchBarStyle.css";
import axios from 'axios';

const ExercisesSearchBar = ({ onSearch }) => {
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedExercise, setSearchedExercise] = useState(null);

  const handleSearchClick = async (name) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5554/exercises/names/${name}`
      );
      setExercises(response.data.data);
      setLoading(false);
      setSearchedExercise(response.data.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Passa il termine di ricerca al genitore per la logica di ricerca
    onSearch(searchTerm.trim());
    console.log(searchTerm);
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
        <FaSearch className="search-icon" onClick={() => handleSearchClick(searchTerm)}/>
      </div>
    </form>
  );
};

export default ExercisesSearchBar;