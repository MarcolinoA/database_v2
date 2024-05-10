import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LeftIcon from "../../../icons/LeftIcon";

const ScheduleEdit = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { userId, scheduleId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5554/users/${userId}/schedules/${scheduleId}`)
      .then((response) => {
        const scheduleData = response.data;
        setName(scheduleData.name);
        setStatus(scheduleData.status);
        setExercises(scheduleData.exercises);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [userId, scheduleId]);

  const handleSaveSchedule = () => {
    const data = {
      name,
      status,
      exercises, // Assicurati che exercises sia un array di esercizi
    };

    setLoading(true);
    axios
      .put(`http://localhost:5554/users/${userId}/schedules/${scheduleId}`, data)
      .then(() => {
        setLoading(false);
        navigate(`/users/${userId}/schedules`);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (
    <div className="create-schedule">
      <div className="create-schedule-header">
        <Link to={`/users/${userId}/schedules`} className="create-schedule-icon">
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

        <div className="input-div">
          <textarea
            placeholder="Exercises (one per line)"
            value={exercises.join("\n")}
            onChange={(e) => setExercises(e.target.value.split("\n"))}
            className="input"
            name="exercises"
          />
        </div>

        <button className="save-btn" onClick={handleSaveSchedule}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ScheduleEdit;