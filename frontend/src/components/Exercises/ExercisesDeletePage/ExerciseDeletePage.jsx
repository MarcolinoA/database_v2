import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ExerciseDeletePageStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const ExerciseDeletePage = () => {
  const [loading, setLoading] = useState(false); // State variable for loading status
  const navigate = useNavigate(); // Function for navigating between routes
  const { exerciseId } = useParams(); // Extract exercise ID from URL parameters
  
  // Function to handle deleting an exercise
  const handleDeleteExercise = () => {
    setLoading(true); // Set loading status to true
    console.log(exerciseId); // Log exercise ID to console
    axios
      .delete(`http://localhost:5554/exercises/${exerciseId}/`)
      .then(() => {
        setLoading(false); // Set loading status to false after successful deletion
        navigate("/exercises-list"); // Navigate to exercises list page
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        console.error("DELETE error:", error); // Log error to console
        alert("An error happened. Please check console"); // Show alert for error
        console.log(error); // Log error to console
      });
  };
  
  return (
    <div className="delete-exercise">
      <Link to="/exercises-list" className="icon">
        <LeftIcon />
      </Link>
      <h1 className="title">Elimina Esercizio</h1>
      {loading ? (
        <div></div>
      ) : (
        ""
      )}
      <div className="delete-container">
        <h3 className="delete-text">
          Sei sicuro di voler eliminare questo esercizio?
        </h3>

        <button className="delete-btn" onClick={handleDeleteExercise}>
          Elimina
        </button>
      </div>
    </div>
  );
};

export default ExerciseDeletePage;