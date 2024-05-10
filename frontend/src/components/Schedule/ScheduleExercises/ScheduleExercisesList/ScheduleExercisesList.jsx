import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LeftIcon from "../../../../icons/LeftIcon";
import CreateIcon from "../../../../icons/CreateIcon";
import DeleteIcon from "../../../../icons/DeleteIcon";
import EditIcon from "../../../../icons/EditIcon";
import "./ScheduleExercisesListStyle.css";
import AddIcon from "../../../../icons/AddIcon";

const ScheduleExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId, scheduleId } = useParams();
  const [series, setSeries] = useState(""); // Inizializza a stringa vuota
  const [rep, setRep] = useState(""); // Inizializza a stringa vuota
  const navigate = useNavigate();

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
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const openAddDialog = (exercise) => {
    setSelectedExercise(exercise);
    // Resetta series e rep a stringa vuota quando si apre il dialog
    setSeries(""); 
    setRep("");
  };

  const onAddClick = () => {
    if (!selectedExercise) return; // Assicurati che selectedExercise sia definito

    const { name, group, image, _id: exerciseId } = selectedExercise; // Destruttura selectedExercise
    const data = {
      name,
      group,
      image,
      series,
      rep
    };

    setLoading(true);
    axios
      .post(
        `http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises/${exerciseId}`,
        data
      )
      .then(() => {
        setLoading(false);
        navigate(`/users/${userId}/schedules/${scheduleId}/view`);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (
    <div className="view-exercises-page">
      <div className="view-exercises-header">
        <Link
          to={`/users/${userId}/schedules/${scheduleId}/view`}
          className="icon"
          id="left-icon-exercises-page"
        >
          <LeftIcon />
        </Link>
        <h1>Aggiungi un esercizio</h1>
        <Link to={`/exercise/create`} className="btn" id="right-icon-exercises-page">
          <CreateIcon />
        </Link>
      </div>
      <table className="exercises-page-table">
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
          {exercises.map((exercise, index) => (
            <tr key={exercise._id} className="user-page-row">
              <td className="user-page-column">{index + 1}</td>
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
                <button className="btn" onClick={() => openAddDialog(exercise)}>
                  <AddIcon />
                </button>
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

      {selectedExercise && (
        <div className="modal">
          <div className="modal-content">
            <h3>Aggiungi serie e ripetizioni per {selectedExercise.name}</h3>
            <input
              type="text"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              placeholder="Serie"
            />
            <input
              type="text"
              value={rep}
              onChange={(e) => setRep(e.target.value)}
              placeholder="Ripetizioni"
            />
            <button className="btn" onClick={onAddClick}>
              Aggiungi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleExercisesList;
