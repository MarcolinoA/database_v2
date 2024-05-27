import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UserDeleteStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const UserDelete = () => {
  const [loading, setLoading] = useState(false); // Define state for loading status
  const navigate = useNavigate(); // Access navigation functions
  const { userId } = useParams(); // Get the user ID from the URL parameters
  
  // Function to handle deleting user data
  const handleDeleteUser = () => {
    setLoading(true); // Set loading status to true before making the request
    axios
      .delete(`http://localhost:5554/users/${userId}/`) // Send DELETE request to delete user data
      .then(() => {
        setLoading(false); // Set loading status to false after successful deletion
        navigate("/users-page/"); // Redirect to users page after successful deletion
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        alert("An error happened. Please check console"); // Show alert for error
        console.log(error); // Log the error to the console for debugging
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

export default UserDelete;