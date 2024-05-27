import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./ScheduleDeleteStyle.css";
import LeftIcon from "../../../icons/LeftIcon";


const ScheduleDelete = () => {
  const [loading, setLoading] = useState(false); // State variable for loading status
  const navigate = useNavigate(); // Access navigation functions
  const { userId, scheduleId } = useParams(); // Get user and schedule IDs from URL parameters

  const location = useLocation(); // Get location object from React Router
  const queryParams = new URLSearchParams(location.search); // Parse query parameters from location
  const userName = queryParams.get("username"); // Get username from query parameters

  // Function to handle deleting a schedule
  const handleDeleteSchedule = () => {
    setLoading(true); // Set loading status to true before making the request
    
    axios
      .delete(`http://localhost:5554/users/${userId}/schedules/${scheduleId}`) // Send DELETE request to delete the schedule
      .then(() => {
        setLoading(false); // Set loading status to false after successful deletion
        navigate(`/users/${userId}/schedules?username=${encodeURIComponent(userName)}`); // Redirect to user's schedules page after successful deletion
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        alert("An error happened. Please check console"); // Show alert for error
        console.log(error); // Log the error to the console for debugging
      });
  };

  return (
    <div className="delete-exercise">
      <Link to={`/users/${userId}/schedules?username=${encodeURIComponent(userName)}`} className="icon">
        <LeftIcon />
      </Link>
      <h1 className="title">Elimina Utente</h1>
      {loading ? (
        <div></div>
      ) : (
        ""
      )}
      <div className="delete-container">
        <h3 className="delete-text">
          Sei sicuro di voler eliminare questa scheda?
        </h3>

        <button className="delete-btn" onClick={handleDeleteSchedule}>
          Elimina
        </button>
      </div>
    </div>
  );
};

export default ScheduleDelete;