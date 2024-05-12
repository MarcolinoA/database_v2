import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteIcon from "../../../../icons/DeleteIcon";
import EditIcon from "../../../../icons/EditIcon";
import axios from "axios";
import "./ViewScheduleStyle.css";
import LeftIcon from "../../../../icons/LeftIcon";
import DownloadIcon from "../../../../icons/DownloadIcon";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewSchedule = () => {
  const [exercises, setExercises] = useState([]);
  const { userId, scheduleId } = useParams(); // Ottieni l'ID dell'utente dalla URL
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Elenco degli Esercizi", 14, 10);
  
    // Utilizza il metodo autoTable di jspdf-autotable per generare la tabella PDF
    doc.autoTable({
      html: tableRef.current, // Passa il riferimento alla tabella HTML
      startY: 20, // Posizione iniziale della tabella nel documento PDF
      didDrawCell: (data) => {
        if (data.column.index === 5 && data.cell.raw.textContent !== "") {
          const img = new Image();
          img.src = data.cell.raw.textContent;
  
          // Verifica che data.cell.textPos sia definito prima di accedere a x e y
          if (data.cell.textPos && typeof data.cell.textPos.x !== 'undefined' && typeof data.cell.textPos.y !== 'undefined') {
            const imgWidth = 20; // larghezza dell'immagine
            const imgHeight = 20; // altezza dell'immagine
            const cellWidth = data.cell.width; // larghezza della cella
            const cellHeight = data.cell.height; // altezza della cella
  
            // Calcola le coordinate per centrare l'immagine nella cella
            const offsetX = (cellWidth - imgWidth) / 2; // offset x per centrare l'immagine
            const offsetY = (cellHeight - imgHeight) / 2; // offset y per centrare l'immagine
  
            // Disegna l'immagine nel documento PDF
            doc.addImage(img, data.cell.textPos.x + offsetX, data.cell.textPos.y + offsetY, imgWidth, imgHeight);
          }
        }
      }
    });
  
    doc.save("exercises.pdf"); // Salva il documento PDF con il nome "exercises.pdf"
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
        <button onClick={handleDownloadPDF} className="icon" id="download-pdf-btn">
          <DownloadIcon />
        </button>
      </div>
      <table  ref={tableRef} className="list-table">
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
