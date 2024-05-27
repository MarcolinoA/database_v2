import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ExercisesCreatePageStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const ExerciseCreatePage = () => {
  const [name, setName] = useState(""); // State variable for exercise name
  const [group, setGroup] = useState(""); // State variable for exercise group
  const [image, setImage] = useState(""); // State variable for exercise image URL
  const [loading, setLoading] = useState(false); // State variable for loading status
  
  const navigate = useNavigate(); // Function for navigating between routes
  
  // Function to handle saving exercise data
  const handleSaveExercise = () => {
    const data = {
      name,
      group,
      image,
    };
  
    setLoading(true); // Set loading status to true
    axios
      .post("http://localhost:5554/exercises", data)
      .then(() => {
        setLoading(false); // Set loading status to false after successful creation
        navigate("/exercises-list"); // Navigate to exercises list page
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        console.error("POST error:", error); // Log error to console
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

export default ExerciseCreatePage;
