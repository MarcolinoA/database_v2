import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteIcon from "../../../../icons/DeleteIcon";
import EditIcon from "../../../../icons/EditIcon";
import axios from "axios";
import "./ViewScheduleStyle.css";
import LeftIcon from "../../../../icons/LeftIcon";
import DownloadIcon from "../../../../icons/DownloadIcon";

const ViewSchedule = () => {
  const [exercises, setExercises] = useState([]); // State variable for exercises
  const { userId, scheduleId } = useParams(); // Get user and schedule IDs from URL parameters
  const [loading, setLoading] = useState(false); // State variable for loading status
  
  const location = useLocation(); // Get current location
  const queryParams = new URLSearchParams(location.search); // Get query parameters
  const userName = queryParams.get("username"); // Get username from query parameters
  const userSurname = queryParams.get("usersurname"); // Get user surname from query parameters
  
  // Fetch exercises when component mounts
  useEffect(() => {
    setLoading(true); // Set loading status to true before making the request
    axios
      .get(`http://localhost:5554/users/${userId}/schedules/${scheduleId}/exercises`) // Send GET request to fetch exercises
      .then((response) => {
        setExercises(response.data.data); // Set exercises state with fetched data
        setLoading(false); // Set loading status to false after successful data retrieval
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error); // Log error to console
        setLoading(false); // Set loading status to false in case of error
      });
  }, [userId, scheduleId]); // Dependency array ensures effect runs only when IDs change
  
  // Function to generate HTML content for PDF
  const generateHTML = () => {
    return `
      <html>
        <head>
          <title>Programma di Allenamento</title>
          <style>
            /* CSS styles for PDF content */
            /* Omitted for brevity */
          </style>
        </head>
        <body>
          <h1>Scheda di ${userName} ${userSurname}</h1>
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
              ${exercises
                .map(
                  (exercise) => `
                <tr>
                  <td>${exercise.day}</td>
                  <td>${exercise.name}</td>
                  <td>${exercise.group}</td>
                  <td>${exercise.series} x ${exercise.rep}</td>
                  <td><img src="${exercise.image}" alt="Exercise" /></td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };
  
  // Function to generate PDF using HTML content
  const generatePDF = async (htmlContent) => {
    try {
      const response = await axios.post( // Send POST request to generate PDF
        "https://api.pdfshift.io/v2/convert/",
        {
          source: htmlContent,
          landscape: false,
          format: "A4",
          margin: "20px"
        },
        {
          headers: {
            Authorization: "Basic sk_b7b402c0cf50f1e0b980aba8e5df3a0748db79a7", // Replace with your API key
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );
  
      return new Blob([response.data], { type: "application/pdf" }); // Return PDF blob
    } catch (error) {
      console.error("Error generating PDF:", error); // Log error to console
      throw error; // Throw error for handling
    }
  };
  
  // Function to download PDF
  const downloadPDF = (pdfBlob) => {
    const pdfUrl = window.URL.createObjectURL(pdfBlob); // Create object URL for PDF blob
    const downloadLink = document.createElement("a"); // Create download link element
    downloadLink.href = pdfUrl; // Set href attribute to PDF URL
    downloadLink.setAttribute("download", "programma_di_allenamento.pdf"); // Set download attribute for filename
    document.body.appendChild(downloadLink); // Append download link to document body
    downloadLink.click(); // Simulate click on download link
  };
  
  // Function to handle PDF generation
  const handleGeneratePDF = async () => {
    try {
      const htmlContent = generateHTML(); // Generate HTML content for PDF
      const pdfBlob = await generatePDF(htmlContent); // Generate PDF blob
      downloadPDF(pdfBlob); // Download PDF
    } catch (error) {
      console.error("Error generating PDF:", error); // Log error to console
      alert("An error occurred while generating the PDF. Please check the console for details."); // Show alert for error
    }
  };

  return (
    <div className="list-page">
      <div className="list-header">
        <Link
          to={`/users/${userId}/schedules?username=${encodeURIComponent(
            userName
          )}&usersurname=${encodeURIComponent(userSurname)}`}
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
