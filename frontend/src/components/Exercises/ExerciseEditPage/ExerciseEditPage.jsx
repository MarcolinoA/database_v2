import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ExerciseEditPageStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const ExerciseEditPage = () => {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { exerciseId } = useParams();

  useEffect(() => {
    console.log("exerciseId:", exerciseId);
    setLoading(true);
    axios
      .get(`http://localhost:5554/exercises/${exerciseId}`)
      .then((response) => {
        console.log("Exercise data:", response.data);
        setName(response.data.name);
        setGroup(response.data.group);
        setImage(response.data.image);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log("GET error:", error);
      });
  }, [exerciseId]);

  const handleSaveExercise = () => {
    const data = {
      name,
      group,
      image,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5554/exercises/${exerciseId}`, data)
      .then(() => {
        setLoading(false);
        navigate("/exercises-list");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Get error:", error)
        alert("An error happened. Please check console");
        console.log(error);
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
