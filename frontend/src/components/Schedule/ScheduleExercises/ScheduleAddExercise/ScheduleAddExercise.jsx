import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LeftIcon from "../../../../icons/LeftIcon";
import "./ScheduleAddExerciseStyle.css";
import AddIcon from "../../../../icons/AddIcon";
import ExercisesSearchBar from "../../../ExercisesSearchBar/ExercisesSearchBar";
import MuscleGroupCarousel from "../../../MuscleGroupCarousel/MuscleGroupCarousel";

const ScheduleEditExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId, scheduleId } = useParams();
  const [series, setSeries] = useState("");
  const [rep, setRep] = useState("");
  const [day, setDay] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get("username");

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
    setSeries("");
    setRep("");
    setDay("");
  };

  const onAddClick = () => {
    if (!selectedExercise) return; // Assicurati che selectedExercise sia definito

    const { name, group, image, _id: exerciseId } = selectedExercise; // Destruttura selectedExercise
    const data = {
      name,
      group,
      image,
      series,
      rep,
      day,
    };

    setLoading(true);
    axios
      .post(
        `http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises/${exerciseId}`,
        data
      )
      .then(() => {
        setLoading(false);
        navigate(
          `/users/${userId}/schedules/${scheduleId}/view?username=${encodeURIComponent(
            userName
          )}`
        );
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  const handleSearchSelect = (exercises) => {
    setExercises(exercises);
  };

  const handleGroupSelect = (exercises) => {
    setSelectedExercises(exercises);
    setExercises(exercises);
  };

  return (
    <div className="schedule-add-exercise">
      <div className="schedule-add-exercise-header">
        <Link
          to={`/users/${userId}/schedules/${scheduleId}/view?username=${encodeURIComponent(
            userName
          )}`}
          className="icon"
        >
          <LeftIcon />
        </Link>
        <h1 className="title">Aggiungi un esercizio</h1>
      </div>
      <div className="search-bar-container">
        <ExercisesSearchBar onSearch={handleSearchSelect}/>
      </div>
      <div className="muscle-group-container">
        <MuscleGroupCarousel onGroupSelect={handleGroupSelect} />
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
                <button
                  className="btn-icon"
                  onClick={() => openAddDialog(exercise)}
                >
                  <AddIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedExercise && (
        <div className="input-container">
          <div className="modal-content">
            <h3>
              Aggiungi giorno, serie e ripetizioni per: <br /> {selectedExercise.name}
            </h3>
            <div className="input-div">
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="Giorno"
                className="input"
              />
            </div>
            <div className="input-div">
              <input
                type="text"
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                placeholder="Serie"
                className="input"
              />
            </div>
            <div className="input-div">
              <input
                type="text"
                value={rep}
                onChange={(e) => setRep(e.target.value)}
                placeholder="Ripetizioni"
                className="input"
              />
            </div>
            <button className="add-btn" onClick={onAddClick}>
              Aggiungi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleEditExercise;
