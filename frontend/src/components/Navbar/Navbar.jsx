import { NavLink } from "react-router-dom";
import "./NavbarStyle.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-item">
          <li className="nav-items">
            <NavLink exact to="/exercises" className={`nav-links`}>
              Esercizi
            </NavLink>
          </li>
          <li className="nav-items">
            <NavLink exact to="/" className={`nav-links`} >
              Home
            </NavLink>
          </li>
          <li className="nav-items">
            <NavLink exact to="/" className={`nav-links`}>
              Crea scheda
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;