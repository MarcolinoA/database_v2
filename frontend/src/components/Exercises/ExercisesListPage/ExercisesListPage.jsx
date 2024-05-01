import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeftIcon from "../../../icons/LeftIcon";
import CreateIcon from "../../../icons/CreateIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";
import "./ExercisesListPageStyle.css";

const ExercisesListPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5554/exercises")
      .then((response) => {
        const exercisesWithIndex = response.data.data.map(
          (exercise, index) => ({
            ...exercise,
            index: index + 1,
          })
        );
        setExercises(exercisesWithIndex);
        setLoading(false);
        console.log(exercises);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  
  return (
    <div className="view-exercises-page">
      <div className="view-exercises-header">
        <Link to="/" className="icon">
          <LeftIcon />
        </Link>
        <div className="view-exercises-info">
          <h1>Barra di ricerca</h1>
          <h1>Carosello Gruppi Muscolari</h1>
        </div>
        <Link to={`/exercise/create`} className="btn">
          <CreateIcon />
        </Link>
      </div>
      <table className="users-page-table">
        <thead className="users-page-thead">
          <tr className="title-row">
            <th className="title-column">Num</th>
            <th className="title-column">Nome</th>
            <th className="title-column">Gruppo</th>
            <th className="title-column">Img</th>
            <th className="title-column">Opzioni</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise._id} className="user-page-row">
              <td className="user-page-column">{exercise.index}</td>
              <td className="user-page-column">{exercise.name}</td>
              <td className="user-page-column">{exercise.group}</td>
              <td className="user-page-column">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="exercise-img"
                />
              </td>
              <td className="user-page-column">
                <Link to={`/exercises/${exercise._id}/delete`} className="btn">
                  <DeleteIcon />
                </Link>
                <Link to={`/exercises/${exercise._id}/edit`} className="btn">
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

export default ExercisesListPage;
