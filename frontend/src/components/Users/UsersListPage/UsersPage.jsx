import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersStyle.css";
import InfoIcon from "../../../icons/InfoIcon";
import { Link } from "react-router-dom";
import LeftIcon from "../../../icons/LeftIcon";
import CreateIcon from "../../../icons/CreateIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5554/users")
      .then((response) => {
        const usersWithIndex = response.data.data.map((user, index) => ({
          ...user,
          index: index + 1,
        }));
        setUsers(usersWithIndex);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="users-page">
      <div className="users-page-header">
        <Link to="/" className="icon">
          <LeftIcon />
        </Link>
        <div className="user-page-info">
          <h1 className="users-page-title">Lista Utenti</h1>
        </div>
        <Link to={`/users/create`} className="btn">
          <CreateIcon />
        </Link>
      </div>
      <table className="users-page-table">
        <thead className="users-page-thead">
          <tr className="title-row">
            <th className="title-column">Num</th>
            <th className="title-column">ID</th>
            <th className="title-column">Nome</th>
            <th className="title-column">Cognome</th>
            <th className="title-column">Data di nascita</th>
            <th className="title-column">Sesso</th>
            <th className="title-column">Schede</th>
            <th className="title-column">Opzioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="user-page-row">
              <td className="user-page-column">{user.index}</td>
              <td className="user-page-column">{user._id}</td>
              <td className="user-page-column">{user.name}</td>
              <td className="user-page-column">{user.surname}</td>
              <td className="user-page-column">{user.birth}</td>
              <td className="user-page-column">{user.gender}</td>
              <td className="user-page-column">
                <Link to={`/users/${user._id}/schedules?username=${encodeURIComponent(user.name)}`} className="btn">
                  <InfoIcon />
                </Link>
              </td>
              <td className="user-page-column">
                <Link to={`/users/${user._id}/delete`} className="btn">
                  <DeleteIcon />
                </Link>
                <Link to={`/users/${user._id}/edit`} className="btn">
                  <EditIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
