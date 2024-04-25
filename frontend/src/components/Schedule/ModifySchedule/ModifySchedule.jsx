import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"; // Aggiungi questa importazione
import BackIcon from "../Icons/BackIcon";

const EditSchedule = () => {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams(); // Usa useParams per ottenere l'ID dai parametri dell'URL

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:7777/exercises/${id}`) // Assicurati di includere lo slash (/) dopo "exercises"
      .then((response) => {
        setName(response.data.name);
        setGroup(response.data.group);
        setDescription(response.data.description);
        setIcon(response.data.icon);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [id]); // Aggiungi id come dipendenza per fare in modo che l'effetto venga eseguito ogni volta che id cambia

  const handleEditSchedule = () => {
    const data = {
      name,
      group,
      description,
      icon,
    };

    setLoading(true);
    axios
      .put(`http://localhost:7777/exercises/${id}`, data) // Assicurati di includere lo slash (/) dopo "exercises"
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (
    <div className="create-exercise">
      <Link to="/" className="icon">
        <BackIcon />
      </Link>
      <h1 className="title">Edit Exercise</h1>
      {loading ? <div>prova</div> : ""}
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
            placeholder="Mousce Group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="input"
            name="group"
          />
        </div>

        <div className="input-div">
          <input
            type="input"
            placeholder="Description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            className="input"
          />
        </div>

        <div className="input-div">
          <input
            type="input"
            placeholder="Icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="input"
            name="description"
          />
        </div>

        <button className="save-btn" onClick={handleEditSchedule}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditSchedule;