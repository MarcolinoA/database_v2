import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteIcon from "../../../../icons/DeleteIcon";
import EditIcon from "../../../../icons/EditIcon";
import axios from "axios";
import "./ViewScheduleStyle.css";
import LeftIcon from "../../../../icons/LeftIcon";
import DownloadIcon from "../../../../icons/DownloadIcon";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
      .get(
        `http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises`
      )
      .then((response) => {
        setExercises(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
        setLoading(false);
      });
  }, [userId, scheduleId]);

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "pt", "a4");

    // Ottieni l'HTML della tabella
    const tableHtml = tableRef.current.outerHTML;

    // Filtra le immagini e rimuovile dalla tabella
    const filteredHtml = tableHtml.replace(/<img[^>]+>/g, "");

    // Aggiungi la tabella al PDF
    pdf.html(filteredHtml, {
      callback: function () {
        // Aggiungi le immagini come file separati
        exercises.forEach((exercise, index) => {
          const imgRef = tableRef.current.querySelectorAll(".exercise-img")[index];
          if (imgRef) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0, img.width, img.height);
              const imageData = canvas.toDataURL("image/jpeg");
              pdf.addPage();
              pdf.addImage(imageData, "JPEG", 10, 10);
              if (index === exercises.length - 1) {
                pdf.save("exercises.pdf");
              }
            };
            img.src = imgRef.src;
          }
        });
      },
    });
  };

  return (
    <div className="list-page">
      <div className="list-header">
        <Link
          to={`/users/${userId}/schedules?username=${encodeURIComponent(
            userName
          )}`}
          className="icon"
          id="left-icon-exercises-page"
        >
          <LeftIcon />
        </Link>
        <h1>Aggiungi un esercizio</h1>
        <button
          className="btn-icon"
          id="download-pdf-btn"
          onClick={handleDownloadPDF}
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
            <th className="title-column">Serie x Rep</th>
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
              <td className="info-column">
                {exercise.series} x {exercise.rep}
              </td>
              <td className="info-column">
                <img src={exercise.image} alt="" className="exercise-img" />
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
