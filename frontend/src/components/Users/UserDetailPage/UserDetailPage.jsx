import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./UserDetailPageStyle.css";
import LeftIcon from "../../../../../frontend_/src/icons/LeftIcon";
import CreateIcon from "../../../../../frontend_/src/icons/CreateIcon";
import ViewingIcon from "../../../../../frontend_/src/icons/ViewingIcon";
import DeleteIcon from "../../../../../frontend_/src/icons/DeleteIcon";
import EditIcon from "../../../../../frontend_/src/icons/EditIcon";

const UserDetailPage = () => {
  const { userId } = useParams(); // Ottieni l'ID dell'utente dalla URL
  const [user, setUser] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Esegui la chiamata API per ottenere i dettagli dell'utente
    axios
      .get(`http://localhost:5554/users/${userId}`)
      .then((response) => {
        setUser(response.data); // Imposta lo stato dell'utente con i dati ottenuti
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei dettagli dell'utente:",
          error
        );
        setLoading(false);
      });
  }, [userId]); // Esegui l'effetto quando userId cambia

  return (
    <div className="users-page-container">
      <div className="users-page-header">
        <Link to="/users-page" className="icon">
          <LeftIcon />
        </Link>
        <div className="user-page-info">
          <h1 className="users-page-title">Nome</h1>
          <h4 className="user-page-id">{userId}</h4>
        </div>
        <Link to="/create-schedule-page" className="icon">
          <CreateIcon />
        </Link>
      </div>
      <table className="users-page-table">
        <thead className="users-page-thead">
          <tr className="title-row">
            <th className="title-column">Nome Scheda</th>
            <th className="title-column">Stato</th>
            <th className="title-column">Visualizza</th>
            <th className="title-column">Opzioni</th>
          </tr>
        </thead>
        <tbody>
          {schedules && schedules.length > 0 ? (
            schedules.map((schedule) => (
              <tr key={schedule._id} className="user-page-row">
                <td className="user-page-column">{schedule.name || "N/A"}</td>
                <td className="user-page-column">{schedule.status || "N/A"}</td>
                <td className="user-page-column">
                  <Link to={`/`} className="icon">
                    <ViewingIcon />
                  </Link>
                </td>
                <td className="user-page-column">
                  <div className="icons-container">
                    <Link to={"/"} className="icon">
                      <DeleteIcon />
                    </Link>
                    <Link to={"/"} className="icon">
                      <EditIcon />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Loading schedules...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailPage;
