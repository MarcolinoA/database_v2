import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserCreateStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const UserCreate = () => {
  const [name, setName] = useState(""); // State variable for user's name
  const [surname, setSurname] = useState(""); // State variable for user's surname
  const [birth, setBirth] = useState(""); // State variable for user's birth date
  const [gender, setGender] = useState(""); // State variable for user's gender
  const [loading, setLoading] = useState(false); // State variable for loading status

  const navigate = useNavigate(); // Access navigation functions

  // Function to handle saving user data
  const handleSaveUser = () => {
    const data = {
      name,
      surname,
      birth,
      gender,
    };

  setLoading(true); // Set loading status to true before making the request
  
  axios
    .post("http://localhost:5554/users", data) // Send POST request to save user data
    .then(() => {
      setLoading(false); // Set loading status to false after successful saving
      navigate("/users-page/"); // Redirect to users page after successful saving
    })
    .catch((error) => {
      setLoading(false); // Set loading status to false in case of error
      alert("An error happened. Please check console"); // Show alert for error
      console.log(error); // Log the error to the console for debugging
    });
  };

  return (
    <div className="create-page">
      <div className="create-header">
        <Link to="/users-page/" className="icon" id="left-icon">
          <LeftIcon />
        </Link>
        <h1 className="create-title">Create User</h1>
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
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="input"
            name="surname"
          />
        </div>

        <div className="input-div">
          <input
            type="input"
            placeholder="Birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            className="input"
            name="birth"
          />
        </div>

        <div className="input-div">
          <input
            type="input"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input"
            name="gender"
          />
        </div>

        <button className="create-btn" onClick={handleSaveUser}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserCreate;
