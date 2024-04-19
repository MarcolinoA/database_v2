import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UsersStyle.css";
import AddIcon from "../../icons/InfoIcon";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="users-page">
      <div className="users-page-container">
        <h1 className="users-page-title">Lista Utenti</h1>
      </div>

      {loading ? (
        <div></div>
      ) : (
        <table className="users-page-table">
          <thead className="users-page-thead">
            <tr className="title-row">
              <th className="title-column">ID</th>
              <th className="title-column">Nome</th>
              <th className="title-column">Cognome</th>
              <th className="title-column">Data di nascita</th>
              <th className="title-column">Sesso</th>
              <th className="title-column">Schede</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="user-page-row">
                <td className="user-page-column">{index + 1}</td>
                <td className="user-page-column">{user.name}</td>
                <td className="user-page-column">{user.surname}</td>
                <td className="user-page-column">{user.bith}</td>
                <td className="user-page-column">{user.gender}</td>
                <td className="user-page-column">
                  <Link
                    to={``}
                    className="icon"
                  >
                    <AddIcon />
                  </Link>
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
