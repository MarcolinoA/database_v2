import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UserDeletePageStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const UserDeletePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const handleDeleteUser = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5554/users/${userId}/`)
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
      <h1 className="title">Elimina Utente</h1>
      {loading ? (
        <div></div>
      ) : (
        ""
      )}
      <div className="delete-container">
        <h3 className="delete-text">
          Sei sicuro di voler eliminare questo utente?
        </h3>

        <button className="delete-btn" onClick={handleDeleteUser}>
          Elimina
        </button>
      </div>
    </div>
  );
};

export default UserDeletePage;