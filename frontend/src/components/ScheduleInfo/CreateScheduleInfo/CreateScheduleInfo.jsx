import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateScheduleInfoStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const CreateScheduleInfo = () => {
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      ID,
      name,
      schedule,
      status,
    };

    setLoading(true);
    axios
      .post("http://localhost:5555/schedules", data)
      .then(() => {
        setLoading(false);
        navigate("/users-page/");
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
        <Link to="/users-page" className="create-schedule-icon">
          <LeftIcon />
        </Link>
        <h1 className="title">Create Schedule</h1>
      </div>
      <div className="input-container">
        <div className="input-div">
          <input
            type="input"
            placeholder="Id"
            value={ID}
            onChange={(e) => setID(e.target.value)}
            className="input"
            name="id"
          />
        </div>

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
            placeholder="Schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="input"
            name="schedule"
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

        <button className="save-btn" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateScheduleInfo;
