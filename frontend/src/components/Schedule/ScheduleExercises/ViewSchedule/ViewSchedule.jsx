import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteIcon from "../../../../icons/DeleteIcon";
import EditIcon from "../../../../icons/EditIcon";
import axios from "axios";
import "./ViewScheduleStyle.css";

const ViewSchedule = () => {
  const [exercises, setExercises] = useState([]);
  const { userId, scheduleId } = useParams(); // Ottieni l'ID dell'utente dalla URL
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises`)
      .then((response) => {
        setExercises(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
        setLoading(false);
      });
  }, [userId, scheduleId]);

  return (
    <div className="list-page">
      <div className="list-header">Header</div>
      <table className="list-table">
        <thead className="list-thead">
          <tr className="title-row">
            <th className="title-column">Num</th>
            <th className="title-column">Nome</th>
            <th className="title-column">Gruppo</th>
            <th className="title-column">Equipment</th>
            <th className="title-column">Rep x Serie</th>
            <th className="title-column">Img</th>
            <th className="title-column">Opzioni</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise._id} className="info-row">
              <td className="info-column">{exercise.index}</td>
              <td className="info-column">{exercise.name}</td>
              <td className="info-column">{exercise.group}</td>
              <td className="info-column">{exercise.equipment}</td>
              <td className="info-column">{exercise.series} x {exercise.rep}</td>
              <td className="info-column">
                <img src={exercise.image} alt="" className="exercise-img"/>
              </td>
              <td className="info-column">
                <div className="options-column">
                  <Link to={`/users/${userId}/schedules/${scheduleId}/exercises/${exercise._id}/delete`} className="icon">
                    <DeleteIcon />
                  </Link>
                  <Link to={`/`} className="icon">
                    <EditIcon />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/users/${userId}/schedules/${scheduleId}/exerciseslist`}>
        <button className="add-btn">Aggiungi un nuovo esercizio</button>
      </Link>
    </div>
  );
};

export default ViewSchedule;
