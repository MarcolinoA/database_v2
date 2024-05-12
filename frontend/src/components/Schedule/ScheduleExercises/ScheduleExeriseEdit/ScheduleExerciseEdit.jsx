import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LeftIcon from "../../../../icons/LeftIcon";

const ScheduleExerciseEdit = () => {
  const [series, setSeries] = useState("");
  const [rep, setRep] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { userId, scheduleId, scheduleExerciseId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises/${scheduleExerciseId}`)
      .then((response) => {
        const { series, rep } = response.data;
        if (series !== undefined && rep !== undefined) {
          const scheduleData = response.data;
          setSeries(scheduleData.series);
          setRep(scheduleData.rep);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error occurred. Please check console for details.");
      });
  }, [userId, scheduleId, scheduleExerciseId]);

  const handleSaveScheduleExercise = () => {
    const data = {
      series,
      rep,
    };
  
    setLoading(true);
    axios
      .put(
        `http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises/${scheduleExerciseId}`,
        data
      )
      .then(() => {
        setLoading(false);
        navigate(`/users/${userId}/schedules`);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (
    <div className="create-schedule">
      <div className="create-schedule-header">
        <Link
          to={`/users/${userId}/schedules`}
          className="create-schedule-icon"
        >
          <LeftIcon />
        </Link>
        <h1 className="title">Edit Schedule</h1>
      </div>
      <div className="input-container">
        <div className="input-div">
          <input
            type="input"
            placeholder="Series"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            className="input"
            name="series"
          />
        </div>

        <div className="input-div">
          <input
            type="input"
            placeholder="Rep"
            value={rep}
            onChange={(e) => setRep(e.target.value)}
            className="input"
            name="rep"
          />
        </div>

        <button className="save-btn" onClick={handleSaveScheduleExercise}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ScheduleExerciseEdit;
