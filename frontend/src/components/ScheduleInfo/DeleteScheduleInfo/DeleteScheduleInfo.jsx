import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./DeleteScheduleInfoStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const DeleteScheduleInfo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/schedules/${id}/`)
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
    <div className="delete-exercise">
      <Link to="/users-page/" className="icon">
        <LeftIcon />
      </Link>
      <h1 className="title">Elimina Scheda</h1>
      {loading ? (
        <div></div>
      ) : (
        ""
      )}
      <div className="delete-container">
        <h3 className="delete-text">
          Sei sicuro di voler eliminare questa scheda?
        </h3>

        <button className="delete-btn" onClick={handleDeleteBook}>
          Elimina
        </button>
      </div>
    </div>
  );
};

export default DeleteScheduleInfo;