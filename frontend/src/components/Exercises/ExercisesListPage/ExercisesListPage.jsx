import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateIcon from "../../../icons/CreateIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import EditIcon from "../../../icons/EditIcon";
import "./ExercisesListPageStyle.css";
import ExercisesSearchBar from "../../ExercisesSearchBar/ExercisesSearchBar";
import MuscleGroupCarousel from "../../MuscleGroupCarousel/MuscleGroupCarousel";

const ExercisesListPage = () => {
  const [exercises, setExercises] = useState([]); // State variable to store exercises data
  const [loading, setLoading] = useState(false); // State variable for loading status
  const [selectedExercises, setSelectedExercises] = useState([]); // State variable to store selected exercises

  // useEffect hook to fetch exercises data when component mounts
  useEffect(() => {
    setLoading(true); // Set loading status to true
    axios
    .get("http://localhost:5554/exercises")
    .then((response) => {
      // Map exercises data to include index for each exercise
      const exercisesWithIndex = response.data.data.map((exercise, index) => ({
        ...exercise,
        index: index + 1,
      }));
      setExercises(exercisesWithIndex); // Set exercises state with updated data
      setLoading(false); // Set loading status to false after data fetching is complete
    })
    .catch((error) => {
      console.log(error); // Log error to console
      setLoading(false); // Set loading status to false in case of error
    });
  }, []); // Empty dependency array to ensure useEffect runs only once, on component mount

  // Function to handle selection of exercises by group
  const handleGroupSelect = (exercises) => {
    setSelectedExercises(exercises); // Set selected exercises state with the provided exercises
    setExercises(exercises); // Update exercises state with the selected exercises
  };

  // Function to handle selection of exercises by search
  const handleSearchSelect = (exercises) => {
    setExercises(exercises); // Update exercises state with the provided exercises
  };

  return (
    <div className="view-exercises-page">
      <div className="view-exercises-header">
        <div className="search-bar-container">
          <ExercisesSearchBar onSearch={handleSearchSelect}/>
        </div>
        <Link
          to={`/exercise/create`}
          className="icon"
          id="right-icon-exercises-page"
        >
          <CreateIcon />
        </Link>
      </div>
      <div className="muscle-group-container">
        <MuscleGroupCarousel onGroupSelect={handleGroupSelect} />
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="exercises-page-table">
          <thead className="users-page-thead">
            <tr className="title-row">                          
              <th className="title-column">Nome</th>
              <th className="title-column">Gruppo</th>
              <th className="title-column">Img</th>
              <th className="title-column">Opzioni</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(exercises) && exercises.map((exercise) => (
              <tr key={exercise._id} className="user-page-row">
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
                  <Link to={`/exercises/${exercise._id}/delete`} className="icon">
                    <DeleteIcon />
                  </Link>
                  <Link to={`/exercises/${exercise._id}/edit`} className="icon">
                    <EditIcon />
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

export default ExercisesListPage;
