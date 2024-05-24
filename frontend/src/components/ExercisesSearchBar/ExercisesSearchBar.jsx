import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./ExercisesSearchBarStyle.css";
import axios from 'axios';

const ExercisesSearchBar = ({ onSearch }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Funzione per gestire il click sulla icona di ricerca
  const handleSearchClick = async (name) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5554/exercises/names/${name}`
      );

      setLoading(false);
      onSearch(response.data.data); // Passa gli esercizi trovati alla funzione onSearch
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Funzione per gestire il cambiamento del valore dell'input di ricerca
  const handleChange = (event) => {
    setSearchTerm(event.target.value); // Aggiorna lo stato con il nuovo valore dell'input
  };

  // Funzione per gestire il submit del form di ricerca
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene il comportamento predefinito del submit del form
    handleSearchClick(searchTerm.trim()); // Effettua la ricerca
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
