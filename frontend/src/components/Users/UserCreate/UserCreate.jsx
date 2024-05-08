import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserCreateStyle.css";
import LeftIcon from "../../../icons/LeftIcon";

const UserCreate = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveUser = () => {
    const data = {
      name,
      surname,
      birth,
      gender,
    };

    setLoading(true);
    axios
      .post("http://localhost:5554/users", data)
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
