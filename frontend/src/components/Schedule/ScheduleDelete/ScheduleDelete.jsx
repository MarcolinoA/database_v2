import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ScheduleDeleteStyle.css";
import LeftIcon from "../../../icons/LeftIcon";


const ScheduleDelete = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId, scheduleId } = useParams();
  
  const handleDeleteSchedule = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5554/users/${userId}/schedules/${scheduleId}`)
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
    <div className="delete-exercise">
      <Link to={`/users/${userId}/schedules`} className="icon">
        <LeftIcon />
      </Link>
      <h1 className="title">Elimina Utente</h1>
      {loading ? (
        <div></div>
      ) : (
        ""
      )}
      <div className="delete-container">
        <h3 className="delete-text">
          Sei sicuro di voler eliminare questa scheda?
        </h3>

        <button className="delete-btn" onClick={handleDeleteSchedule}>
          Elimina
        </button>
      </div>
    </div>
  );
};

export default ScheduleDelete;