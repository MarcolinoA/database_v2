import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./UserDetailPageStyle.css";
import LeftIcon from "../../../icons/LeftIcon";
import CreateIcon from "../../../icons/CreateIcon";
import ViewingIcon from "../../../icons/ViewingIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";

const UserDetailPage = () => {
  const { userId } = useParams(); // Ottieni l'ID dell'utente dalla URL
  const [user, setUser] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  axios
    .get(`http://localhost:5554/users/${userId}/schedules`)
    .then((response) => {
      const userData = response.data;
      setUser(userData);
      setSchedules(userData.data); // Aggiorna lo stato con i dati delle schede
      setLoading(false);
    })
    .catch((error) => {
      console.error("Errore durante il recupero dei dettagli dell'utente:", error);
      setLoading(false);
    });
}, [userId]);

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
        <Link to={`/users/${userId}/schedules/create`} className="icon">
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
                    <Link to={`/users/${userId}/schedules/${schedule._id}/delete`} className="icon">
                      <DeleteIcon />
                    </Link>
                    <Link to={`/users/${userId}/schedules/${schedule._id}/edit`} className="icon">
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
