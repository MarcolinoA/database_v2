import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"; // Aggiungi questa importazione
import LeftIcon from "../../../icons/LeftIcon";

const EditSchedule = () => {
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/schedules/${id}`)
      .then((response) => {
        setID(response.data.id);
        setName(response.data.name);
        setSchedule(response.data.schedule);
        setStatus(response.data.status);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [id]);

  const handleSaveSchedule = () => {
    const data = {
      ID, // Utilizza id anziché suca
      name,
      schedule,
      status,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/schedules/${id}`, data)
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

        <button className="save-btn" onClick={handleSaveSchedule}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditSchedule;