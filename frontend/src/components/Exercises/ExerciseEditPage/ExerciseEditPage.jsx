import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ExerciseEditPageStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const ExerciseEditPage = () => {
  const [name, setName] = useState(""); // State variable for exercise name
  const [group, setGroup] = useState(""); // State variable for exercise group
  const [image, setImage] = useState(""); // State variable for exercise image URL
  const [loading, setLoading] = useState(false); // State variable for loading status
  
  const navigate = useNavigate(); // Function for navigating between routes
  const { exerciseId } = useParams(); // Get exercise ID from URL parameters
  
  useEffect(() => {
    console.log("exerciseId:", exerciseId); // Log exercise ID to console
    setLoading(true); // Set loading status to true
    axios
      .get(`http://localhost:5554/exercises/${exerciseId}`)
      .then((response) => {
        console.log("Exercise data:", response.data); // Log exercise data to console
        // Update state with exercise data
        setName(response.data.name);
        setGroup(response.data.group);
        setImage(response.data.image);
        setLoading(false); // Set loading status to false after successful data retrieval
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        alert("An error happened. Please check console"); // Show alert for error
        console.log("GET error:", error); // Log error to console
      });
  }, [exerciseId]);
  
  // Function to handle saving exercise data
  const handleSaveExercise = () => {
    const data = {
      name,
      group,
      image,
    };
  
    setLoading(true); // Set loading status to true
    axios
      .put(`http://localhost:5554/exercises/${exerciseId}`, data)
      .then(() => {
        setLoading(false); // Set loading status to false after successful update
        navigate("/exercises-list"); // Navigate to exercises list page
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        console.error("PUT error:", error); // Log error to console
        alert("An error happened. Please check console"); // Show alert for error
        console.log(error); // Log error to console
      });
  };  

  return (
    <div className="create-schedule">
      <div className="create-schedule-header">
        <Link to="/exercises-list" className="create-schedule-icon">
          <LeftIcon />
        </Link>
        <h1 className="title">Create Exercise</h1>
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
            placeholder="Group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="input"
            name="group"
          />
        </div>

        <div className="input-div">
          <input
            type="input"
            placeholder="Img"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input"
            name="image"
          />
        </div>

        <button className="save-btn" onClick={handleSaveExercise}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ExerciseEditPage;
