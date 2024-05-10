import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LeftIcon from "../../../../icons/LeftIcon";
import "./ScheduleExerciseDeleteStyle.css";

const ScheduleExerciseDelete = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId, scheduleId, exerciseId } = useParams();

  const handleDeleteScheduleExercise = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises/${exerciseId}`)
      .then(() => {
        navigate(`/users/${userId}/schedules/${scheduleId}/view`);
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione dell'esercizio:", error);
        alert("Si è verificato un errore durante l'eliminazione dell'esercizio. Controlla la console per i dettagli.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="delete-exercise">
      <Link to={`/users/${userId}/schedules/${scheduleId}/view`} className="icon">
        <LeftIcon />
      </Link>
      <h1 className="title">Elimina Esercizio</h1>
      <div className="delete-container">
        <h3 className="delete-text">
          Sei sicuro di voler eliminare questo esercizio dalla scheda?
        </h3>
        <button className="delete-btn" onClick={handleDeleteScheduleExercise} disabled={loading}>
          {loading ? "Eliminazione in corso..." : "Elimina"}
        </button>
      </div>
    </div>
  );
};

export default ScheduleExerciseDelete;
