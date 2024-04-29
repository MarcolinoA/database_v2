import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LeftIcon from "../../../icons/LeftIcon";
import CreateIcon from "../../../icons/CreateIcon";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";
import "./UserPersonalInfoStyle.css";
import ViewingIcon from "../../../icons/ViewingIcon";

const UserPersonalInfo = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const location = useLocation();
  const { userName, userId } = location.state;

  useEffect(() => {
    console.log(userId);
    setLoading(true);
    axios
      .get(`http://localhost:5555/users/${id}`)
      .then((response) => {
        const userData = response.data.data;
        if (userData && userData.schedules && userData.schedules.length > 0) {
          setSchedules(userData.schedules);
        } else {
          setSchedules([]); // Nessun dato trovato
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [id]);

  return (
    <div className="users-page-container">
      <div className="users-page-header">
        <Link to="/users-page" className="icon">
          <LeftIcon />
        </Link>
        <div className="user-page-info">
          <h1 className="users-page-title">{userName}</h1>
          <h4 className="users-page-id">{userId}</h4>
        </div>
        <Link to="/create-schedule-page" className="icon">
          <CreateIcon />
        </Link>
      </div>
      <table className="users-page-table">
        <thead className="users-page-thead">
          <tr className="title-row">
            <th className="title-column">Nome Scheda</th>
            <th className="title-column">ID</th>
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
                <td className="user-page-column">{userId}</td>
                <td className="user-page-column">{schedule.status || "N/A"}</td>
                <td className="user-page-column">
                  <Link
                    state={{
                      scheduleName: schedule?.name || "N/A",
                      userId: userId,
                    }}
                    to={`/view-schedule-page/${schedule?._id || ""}`}
                    className="icon"
                  >
                    <ViewingIcon />
                  </Link>
                </td>
                <td className="user-page-column">
                  <div className="icons-container">
                    <Link
                      to={`/delete-schedule-page/${schedule?._id || ""}`}
                      className="icon"
                    >
                      <DeleteIcon />
                    </Link>
                    <Link
                      to={`/edit-schedule-page/${schedule?._id || ""}`}
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

export default UserPersonalInfo;
