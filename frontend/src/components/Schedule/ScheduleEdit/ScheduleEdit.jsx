import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LeftIcon from "../../../icons/LeftIcon";
import "./ScheduleEditStyle.css"

const ScheduleEdit = () => {
  const [name, setName] = useState(""); // State variable for schedule name
  const [status, setStatus] = useState(""); // State variable for schedule status
  const [exercises, setExercises] = useState([]); // State variable for schedule exercises
  const [loading, setLoading] = useState(false); // State variable for loading status
  
  const navigate = useNavigate(); // Access navigation functions
  const { userId, scheduleId } = useParams(); // Get user and schedule IDs from URL parameters
  
  const location = useLocation(); // Get location object from React Router
  const queryParams = new URLSearchParams(location.search); // Parse query parameters from location
  const userName = queryParams.get("username"); // Get username from query parameters
  
  // Effect to fetch schedule data when component mounts or when user/schedule IDs change
  useEffect(() => {
    setLoading(true); // Set loading status to true before making the request
    axios
      .get(`http://localhost:5554/users/${userId}/schedules/${scheduleId}`) // Send GET request to fetch schedule data
      .then((response) => {
        const scheduleData = response.data; // Extract schedule data from response
        setName(scheduleData.name); // Update schedule name state
        setStatus(scheduleData.status); // Update schedule status state
        setExercises(scheduleData.exercises); // Update schedule exercises state
        setLoading(false); // Set loading status to false after data is fetched
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        alert("An error happened. Please check console"); // Show alert for error
        console.log(error); // Log the error to the console for debugging
      });
  }, [userId, scheduleId]); // Dependencies for the effect, userId and scheduleId
  
  // Function to handle saving the schedule
  const handleSaveSchedule = () => {
    const data = {
      name,
      status,
      exercises,
    };
  
    setLoading(true); // Set loading status to true before making the request
    axios
      .put(`http://localhost:5554/users/${userId}/schedules/${scheduleId}`, data) // Send PUT request to update the schedule
      .then(() => {
        setLoading(false); // Set loading status to false after successful update
        navigate(`/users/${userId}/schedules?username=${encodeURIComponent(userName)}`); // Redirect to user's schedules page after successful update
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        alert("An error happened. Please check console"); // Show alert for error
        console.log(error); // Log the error to the console for debugging
      });
  };
  

  return (
    <div className="edit-schedule">
      <div className="edit-schedule-header">
        <Link id="left-icon" to={`/users/${userId}/schedules?username=${encodeURIComponent(userName)}`}>
          <LeftIcon />
        </Link>
        <h1 className="title">Edit Schedule</h1>
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

        <button className="edit-btn" onClick={handleSaveSchedule}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ScheduleEdit;