import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"; // Aggiungi questa importazione
import LeftIcon from "../../../icons/LeftIcon";
import "./UserEditStyle.css"

const UserEdit = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5554/users/${userId}`)
      .then((response) => {
        setName(response.data.name);
        setSurname(response.data.surname);
        setBirth(response.data.birth);
        setGender(response.data.gender);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [userId]);

  const handleSaveUser = () => {
    const data = {
      name,
      surname,
      birth,
      gender
    };

    setLoading(true);
    axios
      .put(`http://localhost:5554/users/${userId}`, data)
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
