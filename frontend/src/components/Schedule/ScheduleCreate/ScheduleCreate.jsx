import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LeftIcon from "../../../icons/LeftIcon";
import "./ScheduleCreateStyle.css";

const ScheduleCreate = () => {
  const [name, setName] = useState(""); // State variable for schedule name
  const [status, setStatus] = useState(""); // State variable for schedule status
  const [exercises, setExercises] = useState([]); // State variable for schedule exercises
  const [loading, setLoading] = useState(false); // State variable for loading status
  
  const navigate = useNavigate(); // Access navigation functions
  const { userId, scheduleId } = useParams(); // Get user and schedule IDs from URL parameters
  
  const location = useLocation(); // Get location object from React Router
  const queryParams = new URLSearchParams(location.search); // Parse query parameters from location
  const userName = queryParams.get("username"); // Get username from query parameters
  
  // Function to handle saving schedule
  const handleSaveSchedule = () => {
    const data = {
      name,
      status,
      exercises,
    };
  
    setLoading(true); // Set loading status to true before making the request
    axios
      .post(`http://localhost:5554/users/${userId}/schedules`, data) // Send POST request to save schedule data
      .then(() => {
        setLoading(false); // Set loading status to false after successful saving
        navigate(`/users/${userId}/schedules?username=${encodeURIComponent(userName)}`); // Redirect to user's schedules page after successful saving
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        alert("An error happened. Please check console"); // Show alert for error
        console.log(error); // Log the error to the console for debugging
      });
  };
  

  return (
    <div className="create-schedule">
      <div className="create-schedule-header">
        <Link to={`/users/${userId}/schedules?username=${encodeURIComponent(userName)}`} id="left-icon" className="create-schedule-icon">
          <LeftIcon />
        </Link>
        <h1 className="title">Create Schedule</h1>
      </div>
      <div className="input-container">
        <div className="input-div">
          <input
            type="input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            name="name"
          />
        </div>

        <div className="input-div">
          <input
            type="input"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input"
            name="status"
          />
        </div>

        <button className="create-btn" onClick={handleSaveSchedule}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ScheduleCreate;