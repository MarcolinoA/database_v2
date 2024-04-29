import React from "react";
import "./ViewScheduleStyle.css";
import { Link, useLocation } from "react-router-dom";
import AddIcon from "../../../icons/AddIcon";
import LeftIcon from "../../../icons/LeftIcon";

const ViewSchedule = () => {
  const location = useLocation();
  const { scheduleName, userId, scheduleId } = location.state;

  return (
    <div className="view-schedule">
      <div className="view-schedule-header">
        <Link to="/users-page" className="icon">
          <LeftIcon />
        </Link>
        <div className="view-schedule-info">
          <h1 className="view-schedule-title">{scheduleName}</h1>
          <h4 className="view-schedule-id">{userId}</h4>
        </div>
        <Link to="/add-exercises-page" state={{ scheduleId: scheduleId }} className="icon">
          <AddIcon />
        </Link>
      </div>
      <table className="view-schedule-table">
        <thead className="view-schedule-thead">
          <tr className="title-row">
            <th className="title-column">Num</th>
            <th className="title-column">Nome</th>
            <th className="title-column">Serie</th>
            <th className="title-column">Ripetizioni</th>
            <th className="title-column">Pausa</th>
            <th className="title-column">Gruppo</th>
            <th className="title-column">Opzioni</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default ViewSchedule;

