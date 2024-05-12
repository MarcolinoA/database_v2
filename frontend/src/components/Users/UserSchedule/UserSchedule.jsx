import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import "./UserScheduleStyle.css";
import LeftIcon from "../../../icons/LeftIcon";
import CreateIcon from "../../../icons/CreateIcon";
import ViewingIcon from "../../../icons/ViewingIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";

const UserSchedule = () => {
  const { userId } = useParams(); // Ottieni l'ID dell'utente dalla URL
  const [user, setUser] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get("username");

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
        console.error(
          "Errore durante il recupero dei dettagli dell'utente:",
          error
        );
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
          <h1 className="users-page-title">{userName}</h1>
          <h4 className="user-page-id">{userId}</h4>
        </div>
        <Link to={`/users/${userId}/schedules/create?username=${encodeURIComponent(userName)}`} className="icon">
          <CreateIcon />
        </Link>
      </div>
      <table className="users-page-table">
        <thead className="users-page-thead">
          <tr className="title-row">
            <th className="title-column">Nome Scheda</th>
            <th className="title-column">Data</th>
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
                <td className="user-page-column">
                  {schedule.date
                    ? format(new Date(schedule.date), "dd/MM/yyyy")
                    : "N/A"}
                </td>
                <td className="user-page-column">{schedule.status || "N/A"}</td>
                <td className="user-page-column">
                  <Link to={`/users/${userId}/schedules/${schedule._id}/view?username=${encodeURIComponent(userName)}`} className="icon">
                    <ViewingIcon />
                  </Link>
                </td>
                <td className="user-page-column">
                  <div className="icons-container">
                    <Link
                      to={`/users/${userId}/schedules/${schedule._id}/delete?username=${encodeURIComponent(userName)}`}
                      className="icon"
                    >
                      <DeleteIcon />
                    </Link>
                    <Link
                      to={`/users/${userId}/schedules/${schedule._id}/edit?username=${encodeURIComponent(userName)}`}
                      className="icon"
                    >
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

export default UserSchedule;
