import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

  const location = useLocation();
  const { userName, userId } = location.state;
  
  useEffect(() => {
    console.log(userName);
    console.log(userId);
    setLoading(true);
    axios
      .get(`http://localhost:5555/schedules?user_id=${userId}`)
      .then((response) => {
        setSchedules(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
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
          {schedules.map((schedule) => (
            <tr key={schedule._id} className="user-page-row">
              <td className="user-page-column">{schedule.name}</td>
              <td className="user-page-column">{userId}</td>
              <td className="user-page-column">{schedule.status}</td>
              <td className="user-page-column">
                <Link
                  state={{ scheduleName: schedule.name, userId: userId }}
                  to={`/view-schedule-page`}
                  className="icon"
                >
                  <ViewingIcon />
                </Link>
              </td>
              <td className="user-page-column">
                <div className="icons-container">
                  <Link
                    to={`/delete-schedule-page/${schedule._id}`}
                    className="icon"
                  >
                    <DeleteIcon />
                  </Link>
                  <Link
                    to={`/edit-schedule-page/${schedule._id}`}
                    className="icon"
                  >
                    <EditIcon />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPersonalInfo;
