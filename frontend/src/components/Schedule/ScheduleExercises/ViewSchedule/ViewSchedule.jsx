import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import DeleteIcon from '../../../../icons/DeleteIcon';
import EditIcon from '../../../../icons/EditIcon';
import axios from 'axios';
import './ViewScheduleStyle.css';
import LeftIcon from '../../../../icons/LeftIcon';
import DownloadIcon from '../../../../icons/DownloadIcon';

const ViewSchedule = () => {
  const [exercises, setExercises] = useState([]);
  const { userId, scheduleId } = useParams();
  const [loading, setLoading] = useState(false);

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

  const handleGeneratePDF = async () => {
    try {
      const htmlContent = generateHTML(); // Funzione per generare il contenuto HTML del PDF
      const pdfBlob = await generatePDF(htmlContent); // Funzione per generare il PDF
      downloadPDF(pdfBlob); // Funzione per scaricare il PDF
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const generateHTML = () => {
    return `
      <html>
        <head>
          <title>Programma di Allenamento</title>
          <style>
            /* Aggiungi i tuoi stili CSS personalizzati qui */
          </style>
        </head>
        <body>
          <h1>Programma di Allenamento</h1>
          <table>
            <thead>
              <tr>
                <th>Giorno</th>
                <th>Nome</th>
                <th>Gruppo</th>
                <th>Serie x Rep</th>
                <th>Img</th>
              </tr>
            </thead>
            <tbody>
              ${exercises.map(exercise => `
                <tr>
                  <td>${exercise.day}</td>
                  <td>${exercise.name}</td>
                  <td>${exercise.group}</td>
                  <td>${exercise.series} x ${exercise.rep}</td>
                  <td><img src="${exercise.image}" alt="Exercise" /></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  const generatePDF = async (htmlContent) => {
    try {
      const response = await axios.post('https://api.pdfshift.io/v2/convert/', {
        source: htmlContent,
        landscape: true,
      }, {
        headers: {
          Authorization: 'Basic sk_b7b402c0cf50f1e0b980aba8e5df3a0748db79a7', // Sostituisci con la tua chiave API
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      });

      return new Blob([response.data], { type: 'application/pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  };

  const downloadPDF = (pdfBlob) => {
    const pdfUrl = window.URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfUrl;
    downloadLink.setAttribute('download', 'programma_di_allenamento.pdf');
    document.body.appendChild(downloadLink);
    downloadLink.click();
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
        <h1>Visualizza Esercizi</h1>
        <button
          className="btn-icon"
          id="download-pdf-btn"
          onClick={handleGeneratePDF}
        >
          <DownloadIcon />
        </button>
      </div>
      <table className="list-table">
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
              <td className="info-column">{exercise.series} x {exercise.rep}</td>
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
