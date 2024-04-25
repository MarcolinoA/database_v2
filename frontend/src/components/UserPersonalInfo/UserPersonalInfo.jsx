import React, { useEffect, useState } from "react";
import LeftIcon from "../../icons/LeftIcon";
import CreateIcon from "../../icons/CreateIcon";
import UsersPage from "../UserPage/UsersPage";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";

const UserPersonalInfo = (props) => {
  const [schedules, setSchedules] = useState([]);
  const [showDetails, setShowDetails] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user_name, user_id } = props;

  useEffect(() => {
    if (showDetails) {
      setLoading(true);
      axios
        .get("http://localhost:5555/schedules")
        .then((response) => {
          setSchedules(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [showDetails]);

  const onBtnClickDetail = () => {
    setShowDetails(false);
  };

  return (
    <div className="users-page-container">
      {showDetails ? (
        <>
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
          <table className="users-page-table">
            <thead className="users-page-thead">
              <tr className="title-row">
                <th className="title-column">Nome Scheda</th>
                <th className="title-column">Scheda</th>
                <th className="title-column">Stato</th>
                <th className="title-column">Opzioni</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule._id} className="user-page-row">
                  <td className="user-page-column">{schedule.name}</td>
                  <td className="user-page-column">{schedule.schedule}</td>
                  <td className="user-page-column">{schedule.status}</td>
                  <td className="user-page-column">
                    <div className="icons-container">
                      <Link to={`/delete-schedule-page/${schedule._id}`} className="icon">
                        <DeleteIcon />
                      </Link>
                      <Link to="/edit-schedule-page/${schedule._id}" className="icon">
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
