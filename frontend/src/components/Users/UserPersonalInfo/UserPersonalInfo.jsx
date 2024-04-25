import React, { useEffect, useState } from "react";
import LeftIcon from "../../../icons/LeftIcon";
import CreateIcon from "../../../icons/CreateIcon";
import UsersPage from "../UserPage/UsersPage";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";
import "./UserPersonalInfoStyle.css";
import ViewingIcon from "../../../icons/ViewingIcon";

const UserPersonalInfo = (props) => {
  const [schedules, setSchedules] = useState([]);
  const [showDetails, setShowDetails] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user_name, user_id } = props;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/schedules?user_id=${user_id}`)
      .then((response) => {
        setSchedules(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [user_id]);

  const onBtnClickDetail = () => {
    setShowDetails(false);
  };

  return (
    <div className="users-page-container">
      {showDetails ? (
        <>
          <div className="users-page-header">
            <button onClick={() => onBtnClickDetail()}>
              <LeftIcon />
            </button>
            <div className="user-page-info">
              <h1 className="users-page-title">{user_name}</h1>
              <h4 className="users-page-id">{user_id}</h4>
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
                <th className="title-column">Visualizza</th>
                <th className="title-column">Stato</th>
                <th className="title-column">Opzioni</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule._id} className="user-page-row">
                  <td className="user-page-column">{schedule.name}</td>
                  <td className="user-page-column">{user_id}</td>
                  <td className="user-page-column">
                    <Link to={`/view-schedule-page`} className="icon">
                      <ViewingIcon />
                    </Link>
                  </td>
                  <td className="user-page-column">{schedule.status}</td>
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
        </>
      ) : (
        <UsersPage />
      )}
    </div>
  );
};

export default UserPersonalInfo;
