import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersListStyle.css";
import InfoIcon from "../../../icons/InfoIcon";
import { Link } from "react-router-dom";
import LeftIcon from "../../../icons/LeftIcon";
import CreateIcon from "../../../icons/CreateIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";

const UsersList = () => {
  const [users, setUsers] = useState([]); // Define state for users array
  const [loading, setLoading] = useState(false); // Define state for loading status
  
  useEffect(() => {
    setLoading(true); // Set loading status to true before making the request
    axios
      .get("http://localhost:5554/users") // Fetch users data from the server
      .then((response) => {
        // Process the response
        const usersWithIndex = response.data.data.map((user, index) => ({
          ...user,
          index: index + 1, // Add an index property to each user object
        }));
        setUsers(usersWithIndex); // Update the users state with the fetched data
        setLoading(false); // Set loading status to false after data is fetched
      })
      .catch((error) => {
        // Handle errors if any
        console.log(error);
        setLoading(false); // Set loading status to false in case of error
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="list-page">
      <div className="list-header">
        <Link to="/" className="icon" id="left-icon">
          <LeftIcon />
        </Link>
        <div>
          <h1 className="list-title">Lista Utenti</h1>
        </div>
        <Link to={`/users/create`} className="icon" id="create-icon">
          <CreateIcon />
        </Link>
      </div>
      <table className="list-table">
        <thead className="list-thead">
          <tr className="title-row">
            <th className="title-column">Num</th>
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
            <tr key={user._id} className="info-row">
              <td className="info-column">{user.index}</td>
              <td className="info-column">{user.name}</td>
              <td className="info-column">{user.surname}</td>
              <td className="info-column">{user.birth}</td>
              <td className="info-column">{user.gender}</td>
              <td className="info-column">
                <Link to={`/users/${user._id}/schedules?username=${encodeURIComponent(user.name)}&usersurname=${encodeURIComponent(user.surname)}`} className="icon">
                  <InfoIcon />
                </Link>
              </td>
              <td className="info-column">
                <div className="options-column">
                  <Link to={`/users/${user._id}/delete`} className="icon" id="options-icon">
                    <DeleteIcon />
                  </Link>
                  <Link to={`/users/${user._id}/edit`} className="icon" id="options-icon">
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

export default UsersList;
