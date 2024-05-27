import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LeftIcon from "../../../../icons/LeftIcon";
import "./ScheduleExerciseEditStyle.css"

const ScheduleExerciseEdit = () => {
  const [series, setSeries] = useState(""); // State variable for series
  const [rep, setRep] = useState(""); // State variable for repetitions
  const [loading, setLoading] = useState(false); // State variable for loading status
  const navigate = useNavigate(); // Access navigation functions
  const { userId, scheduleId, scheduleExerciseId } = useParams(); // Get user, schedule, and exercise IDs from URL parameters
  
  // Fetch exercise data when component mounts
  useEffect(() => {
    setLoading(true); // Set loading status to true before making the request
    axios
      .get(`http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises/${scheduleExerciseId}`) // Send GET request to fetch exercise data
      .then((response) => {
        const { series, rep } = response.data; // Destructure series and rep from response data
        if (series !== undefined && rep !== undefined) {
          // Check if series and rep are defined
          const scheduleData = response.data; // Get exercise data
          setSeries(scheduleData.series); // Set series state
          setRep(scheduleData.rep); // Set rep state
        }
        setLoading(false); // Set loading status to false after successful data retrieval
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        console.log(error); // Log error to console
        alert("An error occurred. Please check the console for details."); // Show alert for error
      });
  }, [userId, scheduleId, scheduleExerciseId]); // Dependency array ensures effect runs only when IDs change
  
  // Function to handle saving schedule exercise data
  const handleSaveScheduleExercise = () => {
    const data = {
      series, // Include series in data
      rep, // Include rep in data
    };
  
    setLoading(true); // Set loading status to true before making the request
    axios
      .put(
        `http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises/${scheduleExerciseId}`, // Send PUT request to update exercise data
        data
      )
      .then(() => {
        setLoading(false); // Set loading status to false after successful request
        navigate(`/users/${userId}/schedules/${scheduleId}/view`); // Navigate to view schedule page after successful update
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        alert("An error happened. Please check the console."); // Show alert for error
        console.log(error); // Log error to console
      });
  };

  return (
    <div className="create-schedule">
      <div className="create-schedule-header">
        <Link
          to={`/users/${userId}/schedules/${scheduleId}/view`}
          className="icon"
        >
          <LeftIcon />
        </Link>
        <h1 className="title">Edit Schedule</h1>
      </div>
      <div className="input-container">
        <div className="input-div">
          <input
            type="input"
            placeholder="Series"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            className="input"
            name="series"
          />
        </div>

        <div className="input-div">
          <input
            type="input"
            placeholder="Rep"
            value={rep}
            onChange={(e) => setRep(e.target.value)}
            className="input"
            name="rep"
          />
        </div>

        <button className="edit-btn" onClick={handleSaveScheduleExercise}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ScheduleExerciseEdit;
