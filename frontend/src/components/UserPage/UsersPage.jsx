import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersStyle.css";
import UserPersonalInfo from "../UserPersonalInfo/UserPersonalInfo";
import InfoIcon from "../../icons/InfoIcon";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedUsers, setExpandedUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/users")
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const onBtnClick = (userId) => {
    setExpandedUsers((prevExpandedUsers) =>
      prevExpandedUsers.includes(userId)
        ? prevExpandedUsers.filter((id) => id !== userId)
        : [...prevExpandedUsers, userId]
    );
  };

  return (
    <div className="user-page">
      <div className="users-page-container">
        <h1 className="users-page-title">Lista Utenti</h1>
      </div>

      {loading ? (
        <div></div>
      ) : (
        <table className="users-page-table">
          <thead className="users-page-thead">
            <tr className="title-row">
              <th className="title-column">Num</th>
              <th className="title-column">Nome</th>
              <th className="title-column">Cognome</th>
              <th className="title-column">Data di nascita</th>
              <th className="title-column">Sesso</th>
              <th className="title-column">Schede</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="user-page-row">
                <td className="user-page-column">{user.index}</td>
                <td className="user-page-column">{user.name}</td>
                <td className="user-page-column">{user.surname}</td>
                <td className="user-page-column">{user.birth}</td>
                <td className="user-page-column">{user.gender}</td>
                <td className="user-page-column">
                  <button
                    onClick={() => onBtnClick(user.name, user._id)}
                    className="icon"
                  >
                    <InfoIcon />
                  </button>
                  {expandedUsers.includes(user._id) ? (
                    <UserPersonalInfo
                      num={user.index}
                      name={user.name}
                      surname={user.surname}
                      birth={user.birth}
                      gender={user.gender}
                      id={user._id}
                    />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersPage;
