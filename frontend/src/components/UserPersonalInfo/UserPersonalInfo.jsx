import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPersonalInfo.css";

const UserPersonalInfo = ({ num, name, surname, birth, gender, id }) => {
  /*
  {schedule.status ? (
              <td className="user-personal-info-column">Attiva</td>
            ) : (
              <td className="user-personal-info-column">Conclusa</td>
            )} 
            */

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/schedules`)
      .then((response) => {
        setSchedules(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="user-personal-info-container">
      <h2 className="user-name">{name}</h2>

      <table className="user-personal-info'table">
        <thead className="users-personal-info-thead">
          <tr className="user-personal-info-title-row">
            <th className="user-personal-info-title-column">Num</th>
            <th className="user-personal-info-title-column">Nome</th>
            <th className="user-personal-info-title-column">Cognome</th>
            <th className="user-personal-info-title-column">Data di nascita</th>
            <th className="user-personal-info-title-column">Sesso</th>
            <th className="user-personal-info-title-column">Opzioni</th>
          </tr>
        </thead>

<tbody>
        <tr className="user-personal-info-row">
          <td className="user-personal-info-column">{num}</td>
          <td className="user-personal-info-column">{name}</td>
          <td className="user-personal-info-column">{surname}</td>
          <td className="user-personal-info-column">{birth}</td>
          <td className="user-personal-info-column">{gender}</td>
          <td className="user-personal-info-column">
            <div className="btns-container">oriva</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserPersonalInfo;
