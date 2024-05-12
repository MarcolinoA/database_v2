import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LeftIcon from "../../../icons/LeftIcon";
import "./ScheduleEditStyle.css"

const ScheduleEdit = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { userId, scheduleId } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get("username");

  useEffect(() => {
    console.log(userName);
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
      exercises,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5554/users/${userId}/schedules/${scheduleId}`, data)
      .then(() => {
        setLoading(false);
        navigate(`/users/${userId}/schedules?username=${encodeURIComponent(userName)}`);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
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