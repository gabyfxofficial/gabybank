import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/accountdetails.css";

function AccountDetails() {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!userData) {
    return (
      <section className="account-details-container">
        <div className="account-details-card account-details-loading">
          <p className="account-details-message">
            No account details found. Please log in.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="account-details-container">
      <div className="account-details-card">
        <h2 className="account-details-title">Account Details</h2>
        <div className="account-details-item">
          <span className="account-details-label">Full Name:</span>
          <span className="account-details-value">
            {userData.firstName} {userData.lastName}
          </span>
        </div>
        <div className="account-details-item">
          <span className="account-details-label">Username:</span>
          <span className="account-details-value">{userData.username}</span>
        </div>
        <div className="account-details-item">
          <span className="account-details-label">Email:</span>
          <span className="account-details-value">{userData.email}</span>
        </div>
        <div className="account-details-item">
          <span className="account-details-label">Phone:</span>
          <span className="account-details-value">{userData.phone}</span>
        </div>
        <div className="account-details-item">
          <span className="account-details-label">Country:</span>
          <span className="account-details-value">{userData.country}</span>
        </div>
        <div className="account-details-item">
          <span className="account-details-label">City:</span>
          <span className="account-details-value">{userData.city}</span>
        </div>
        <div className="account-details-item">
          <span className="account-details-label">Birth Date:</span>
          <span className="account-details-value">{userData.birthDate}</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="account-details-back-button"
        >
          Back
        </button>
      </div>
    </section>
  );
}

export default AccountDetails;
