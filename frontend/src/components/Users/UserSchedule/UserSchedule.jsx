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
  const { userId } = useParams(); // Get the user ID from the URL parameters
  const [user, setUser] = useState(null); // Define state for user details
  const [schedules, setSchedules] = useState([]); // Define state for user schedules
  const [loading, setLoading] = useState(false); // Define state for loading status
  
  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search); // Extract query parameters from the URL
  const userName = queryParams.get("username"); // Get the username from the query parameters
  const userSurname = queryParams.get("usersurname"); // Get the user surname from the query parameters
  
  useEffect(() => {
    setLoading(true); // Set loading status to true before making the request
    axios
      .get(`http://localhost:5554/users/${userId}/schedules`) // Fetch schedules data for the specified user
      .then((response) => {
        // Process the response
        const userData = response.data;
        setUser(userData); // Update the user state with user data
        setSchedules(userData.data); // Update the schedules state with schedule data
        setLoading(false); // Set loading status to false after data is fetched
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Errore durante il recupero dei dettagli dell'utente:", error);
        setLoading(false); // Set loading status to false in case of error
      });
  }, [userId]); // Depend on userId to fetch data when it changes
  

  return (
    <div className="users-page-container">
      <div className="users-page-header">
        <Link to="/users-page" className="icon">
          <LeftIcon />
        </Link>
        <div className="user-page-info">
          <h1 className="users-page-title">{userName} {userSurname}</h1>
          <h4 className="user-page-id">{userId}</h4>
        </div>
        <Link to={`/users/${userId}/schedules/create?username=${encodeURIComponent(userName)}&usersurname=${encodeURIComponent(userSurname)}`} className="icon">
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
                  <Link to={`/users/${userId}/schedules/${schedule._id}/view?username=${encodeURIComponent(userName)}&usersurname=${encodeURIComponent(userSurname)}`} className="icon">
                    <ViewingIcon />
                  </Link>
                </td>
                <td className="user-page-column">
                  <div className="icons-container">
                    <Link
                      to={`/users/${userId}/schedules/${schedule._id}/delete?username=${encodeURIComponent(userName)}&usersurname=${encodeURIComponent(userSurname)}`}
                      className="icon"
                    >
                      <DeleteIcon />
                    </Link>
                    <Link
                      to={`/users/${userId}/schedules/${schedule._id}/edit?username=${encodeURIComponent(userName)}&usersurname=${encodeURIComponent(userSurname)}`}
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
