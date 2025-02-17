import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/updates.css";

function Updates() {
  const navigate = useNavigate();

  return (
    <section className="updates-container">
      <div className="updates-card">
        <header className="updates-header">
          <h2 className="updates-title">Updates</h2>
        </header>
        <main className="updates-main">
          <div className="update-item">
            <h3 className="update-title">New Feature Launched</h3>
            <p className="update-description">
              We have introduced a new savings account feature that allows you
              to set aside money for your future.
            </p>
          </div>
          <div className="update-item">
            <h3 className="update-title">Scheduled Maintenance</h3>
            <p className="update-description">
              Our services will be temporarily unavailable on Sunday, April 30,
              from 2:00 AM to 4:00 AM for maintenance.
            </p>
          </div>
          <div className="update-item">
            <h3 className="update-title">Security Update</h3>
            <p className="update-description">
              We have updated our security protocols to ensure your data remains
              safe. Please update your app for the latest improvements.
            </p>
          </div>
        </main>
        <footer className="updates-footer">
          <button className="updates-back-button" onClick={() => navigate(-1)}>
            Back
          </button>
        </footer>
      </div>
    </section>
  );
}

export default Updates;
