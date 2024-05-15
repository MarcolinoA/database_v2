import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteIcon from "../../../../icons/DeleteIcon";
import EditIcon from "../../../../icons/EditIcon";
import axios from "axios";
import "./ViewScheduleStyle.css";
import LeftIcon from "../../../../icons/LeftIcon";
import DownloadIcon from "../../../../icons/DownloadIcon";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import prova from "./prova.jpeg"

const ViewSchedule = () => {
  const [exercises, setExercises] = useState([]);
  const { userId, scheduleId } = useParams();
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get("username");

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

  const handleDownload = () => {
    if (exercises.length === 0) {
      console.log("No data to download.");
      return;
    }

    try {
      html2canvas(tableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190; // larghezza immagine
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // altezza proporzionale
        pdf.addImage(imgData, "JPG", 10, 10, imgWidth, imgHeight);
        pdf.save("exercises.pdf");
      });
    } catch (error) {
      console.error('Error generating or downloading PDF:', error);
    }
  };

  return (
    <div className="list-page">
      <div className="list-header">
        <Link
          to={`/users/${userId}/schedules?username=${encodeURIComponent(userName)}`}
          className="icon"
          id="left-icon-exercises-page"
        >
          <LeftIcon />
        </Link>
        <h1>Aggiungi un esercizio</h1>
        <button
          className="btn-icon"
          id="download-pdf-btn"
          onClick={handleDownload}
        >
          <DownloadIcon />
        </button>
      </div>
      <table ref={tableRef} className="list-table">
        <thead className="list-thead">
          <tr className="title-row">
            <th className="title-column">Giorno</th>
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
              <td className="info-column">{exercise.day}</td>
              <td className="info-column">{exercise.name}</td>
              <td className="info-column">{exercise.group}</td>
              <td className="info-column">{exercise.equipment}</td>
              <td className="info-column">
                {exercise.series} x {exercise.rep}
              </td>
              <td className="info-column">
                <img src={prova} alt="" className="exercise-img" />
              </td>
              <td className="info-column">
                <div className="options-column">
                  <Link
                    to={`/users/${userId}/schedules/${scheduleId}/exercises/${exercise._id}/delete`}
                    className="icon"
                  >
                    <DeleteIcon />
                  </Link>
                  <Link
                    to={`/users/${userId}/schedules/${scheduleId}/exercises/${exercise._id}/edit`}
                    className="icon"
                  >
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