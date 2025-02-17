import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/helpsupport.css";

function HelpSupport() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  return (
    <section className="help-container">
      <div className="help-card">
        <header className="help-header">
          <h2 className="help-title">Help &amp; Support</h2>
        </header>
        <main className="help-main">
          <section className="help-section">
            <div className="help-item">
              <h4 className="help-question">How do I protect my account?</h4>
              <p className="help-answer">
                We recommend enabling two-factor authentication and regularly
                updating your password to keep your account secure.
              </p>
            </div>
            <div className="help-item">
              <h4 className="help-question">
                What should I do if I suspect unauthorized activity?
              </h4>
              <p className="help-answer">
                Immediately contact our support team using the details below,
                and we will help secure your account.
              </p>
            </div>
          </section>
          <section className="help-section">
            <h3 className="help-section-title">Get in Touch</h3>
            <p className="help-contact">
              For further assistance, please email us at support@gabyfx.com or
              call us at +40 732-512-692. Our support team is available 24/7.
            </p>
          </section>
        </main>
        <footer className="help-footer">
          <button className="help-back-button" onClick={handleBack}>
            Back
          </button>
        </footer>
      </div>
    </section>
  );
}

export default HelpSupport;
