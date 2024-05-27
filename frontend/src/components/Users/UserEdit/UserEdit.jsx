import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"; // Aggiungi questa importazione
import LeftIcon from "../../../icons/LeftIcon";
import "./UserEditStyle.css"

const UserEdit = () => {
  const [name, setName] = useState(""); // Define state for user's name
  const [surname, setSurname] = useState(""); // Define state for user's surname
  const [birth, setBirth] = useState(""); // Define state for user's birthdate
  const [gender, setGender] = useState(""); // Define state for user's gender
  const [loading, setLoading] = useState(false); // Define state for loading status
  
  const navigate = useNavigate(); // Access navigation functions
  const { userId } = useParams(); // Get the user ID from the URL parameters
  
  // Fetch user data from the server when the component mounts or when userId changes
  useEffect(() => {
    setLoading(true); // Set loading status to true before making the request
    axios
      .get(`http://localhost:5554/users/${userId}`) // Fetch user data by user ID
      .then((response) => {
        // Process the response
        setName(response.data.name); // Update name state with user's name
        setSurname(response.data.surname); // Update surname state with user's surname
        setBirth(response.data.birth); // Update birth state with user's birthdate
        setGender(response.data.gender); // Update gender state with user's gender
        setLoading(false); // Set loading status to false after data is fetched
      })
      .catch((error) => {
        // Handle errors if any
        setLoading(false); // Set loading status to false in case of error
        alert("An error happened. Please check console"); // Show alert for error
        console.log(error); // Log the error to the console for debugging
      });
  }, [userId]); // Depend on userId to fetch data when it changes
  
  // Function to handle saving user data
  const handleSaveUser = () => {
    const data = {
      name,
      surname,
      birth,
      gender
    };
  
    setLoading(true); // Set loading status to true before making the request
    axios
      .put(`http://localhost:5554/users/${userId}`, data) // Update user data using PUT request
      .then(() => {
        setLoading(false); // Set loading status to false after successful update
        navigate("/users-page/"); // Redirect to users page after successful update
      })
      .catch((error) => {
        setLoading(false); // Set loading status to false in case of error
        alert("An error happened. Please check console"); // Show alert for error
        console.log(error); // Log the error to the console for debugging
      });
  };
  

  return (
    <div className="edit-page">
      <div className="edit-header">
        <Link to="/users-page" className="icon" id="left-icon">
          <LeftIcon />
        </Link>
        <h1 className="edit-title">Edit User</h1>
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

        <button className="edit-btn" onClick={handleSaveUser}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserEdit;
