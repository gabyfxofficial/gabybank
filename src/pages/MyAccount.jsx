import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/myaccount.css";

function MyAccount() {
  const navigate = useNavigate();
  const { userData, logout } = useContext(AuthContext);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userData) {
      setError("User data not found. Please log in again.");
    }
  }, [userData]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (error) {
    return (
      <section className="account-container">
        <div className="account-card account-loading">{error}</div>
      </section>
    );
  }

  if (!userData) {
    return (
      <section className="account-container">
        <div className="account-card account-loading">Loading...</div>
      </section>
    );
  }

  return (
    <section className="account-container">
      <div className="account-card">
        <h2 className="account-title">My Account</h2>
        <div className="account-hub">
          <Link to="/account-details" className="nav-button">
            Account Details
          </Link>
          <Link to="/updates" className="nav-button">
            Updates
          </Link>
          <Link to="/help" className="nav-button">
            Help &amp; Support
          </Link>
          <Link to="/terms" className="nav-button">
            Terms &amp; Conditions
          </Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </section>
  );
}

export default MyAccount;
