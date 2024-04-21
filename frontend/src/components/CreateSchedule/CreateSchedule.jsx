import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateScheduleStyle.css";
import LeftIcon from "../../icons/LeftIcon";

const CreateSchedule = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      id,
      name,
      schedule,
      status,
    };

    setLoading(true);
    axios
      .post("http://localhost:5555/schedules", data)
      .then(() => {
        setLoading(false);
        navigate("/users-page/user-personal-info");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (
    <div className="create-schedule">
      <Link to="/users-page" className="icon">
        <LeftIcon />
      </Link>
      <h1 className="title">Create Schedule</h1>
      <div className="input-container">
      <div className="input-div">
          <input
            type="input"
            placeholder="Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
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

        <button className="save-btn" onClick={handleSaveBook}>Save</button>
      </div>
    </div>
  );
};

export default CreateSchedule;