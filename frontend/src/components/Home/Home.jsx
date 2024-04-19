import React from "react";
import "./HomeStyle.css";
import home_image from "../../assets/home-image.jpg"
import LogoExt from "../../icons/LogoExt"
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-text">
        <LogoExt />
        <h2 className="home-title">Sport&Fitness Center</h2>
        <p className="home-p">Sfoglia la lista utenti <br />e crea la scheda perfetta</p>
        <NavLink className="bn59" to="users-page">Lista utenti</NavLink>
      </div>

      <div className="div-home-image">
        <img src={home_image} alt="home-image" className="home-image"/>
      </div>
    </div>
  );
};

export default Home;