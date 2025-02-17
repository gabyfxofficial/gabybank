import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCreditCard,
  FaExchangeAlt,
  FaUser,
} from "react-icons/fa";
import "../styles/header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Ascundem header-ul pe pagina de login
  if (location.pathname === "/login") {
    return null;
  }

  // Funcție pentru scroll la top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/home" className="logo" onClick={scrollToTop}>
          <span className="logo-text">Gaby</span>
          <span className="logo-highlight">FX</span>
        </Link>

        <nav className="desktop-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/home" className="nav-link" onClick={scrollToTop}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/card" className="nav-link" onClick={scrollToTop}>
                CARD
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/transfer" className="nav-link" onClick={scrollToTop}>
                TRANSFER
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/myaccount" className="nav-link" onClick={scrollToTop}>
                MY ACCOUNT
              </Link>
            </li>
          </ul>
        </nav>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FaTimes className="menu-icon" />
          ) : (
            <FaBars className="menu-icon" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation for Mobile */}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <button
          className="menu-toggle close-btn"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>

        <h3 className="sidebar-title">NAVIGATION</h3>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link"
                onClick={() => {
                  setIsOpen(false);
                  scrollToTop();
                }}
              >
                <FaHome className="nav-icon" /> HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/card"
                className="nav-link"
                onClick={() => {
                  setIsOpen(false);
                  scrollToTop();
                }}
              >
                <FaCreditCard className="nav-icon" /> CARD
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/transfer"
                className="nav-link"
                onClick={() => {
                  setIsOpen(false);
                  scrollToTop();
                }}
              >
                <FaExchangeAlt className="nav-icon" /> TRANSFER
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/myaccount"
                className="nav-link"
                onClick={() => {
                  setIsOpen(false);
                  scrollToTop();
                }}
              >
                <FaUser className="nav-icon" /> MY ACCOUNT
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </header>
  );
}

export default Header;
