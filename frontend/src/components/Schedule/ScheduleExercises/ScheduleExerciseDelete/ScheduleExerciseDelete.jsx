import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LeftIcon from "../../../../icons/LeftIcon";
import "./ScheduleExerciseDeleteStyle.css";

const ScheduleExerciseDelete = () => {
  const [loading, setLoading] = useState(false); // State variable for loading status
  const navigate = useNavigate(); // Access navigation functions
  const { userId, scheduleId, exerciseId } = useParams(); // Get user, schedule, and exercise IDs from URL parameters

    // Function to handle deleting a schedule exercise
  const handleDeleteScheduleExercise = () => {
    setLoading(true); // Set loading status to true before making the request
    axios
      .delete(`http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises/${exerciseId}`) // Send DELETE request to delete the exercise
      .then(() => {
        navigate(`/users/${userId}/schedules/${scheduleId}/view`); // Navigate to view schedule page after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting exercise:", error); // Log error to console
        alert("An error occurred while deleting the exercise. Check the console for details."); // Show alert for error
      })
      .finally(() => {
        setLoading(false); // Set loading status to false after request completion
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
