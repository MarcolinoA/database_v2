import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ExerciseDeletePageStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const ExerciseDeletePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  
  const handleDeleteExercise = () => {
    setLoading(true);
    console.log(exerciseId);
    axios
      .delete(`http://localhost:5554/exercises/${exerciseId}/`)
      .then(() => {
        setLoading(false);
        navigate("/exercises-list");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
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