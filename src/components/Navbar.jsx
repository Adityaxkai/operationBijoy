import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import './Navbar.css';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar-header">
      <div className="container">
        <div className="navbar-grid">
          {/* Logo Section */}
          <div className="logo">
            <div className="img">
              <img src="/src/assets/Picture2.png" alt="logo-image" />
            </div>
            <h1>Bijoy Institute</h1>
          </div>

          {/* Navigation Links */}
          <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
            <ul>
              <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
              <li><NavLink to="/members" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Members</NavLink></li>
              <li><NavLink to="/events" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Events</NavLink></li>
              <li><NavLink to="/coaching" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Coaching</NavLink></li>
              <li><NavLink to="/finances" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Finances</NavLink></li>
              <li><NavLink to="/attendance" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Attendance</NavLink></li>
            </ul>
          </nav>

          {/* Hamburger Menu */}
          <div className="ham-menu">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              <RxHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};