import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/terms.css";

function TermsAndConditions() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  return (
    <section className="terms-container">
      <div className="terms-card">
        <header className="terms-header">
          <h2 className="terms-title">Terms and Conditions</h2>
        </header>
        <main className="terms-main">
          <p className="terms-paragraph">
            Welcome to MyBank's mobile banking application. These Terms and
            Conditions govern your use of our banking services. By accessing and
            using our app, you agree to be bound by these Terms. Please review
            them carefully.
          </p>
          <section className="terms-section">
            <h3 className="terms-section-title">Overview of Services</h3>
            <p className="terms-section-paragraph">
              MyBank provides a range of financial services including account
              management, funds transfer, bill payments, and more. Our goal is
              to ensure secure and efficient banking for our customers. All
              services are subject to applicable laws and regulations.
            </p>
          </section>
          <section className="terms-section">
            <h3 className="terms-section-title">User Responsibilities</h3>
            <p className="terms-section-paragraph">
              You are responsible for maintaining the confidentiality of your
              login credentials and for all activities conducted through your
              account. You agree to notify MyBank immediately of any
              unauthorized use of your account.
            </p>
          </section>
          <section className="terms-section">
            <h3 className="terms-section-title">Security and Privacy</h3>
            <p className="terms-section-paragraph">
              We implement robust security measures to protect your personal and
              financial data. However, you acknowledge that no method of
              transmission over the internet is completely secure. Please review
              our Privacy Policy for more details.
            </p>
          </section>
          <section className="terms-section">
            <h3 className="terms-section-title">Fees and Charges</h3>
            <p className="terms-section-paragraph">
              Use of our services may be subject to fees and charges as outlined
              in our Fee Schedule. MyBank reserves the right to modify these
              fees at any time, and any changes will be communicated to you in
              advance.
            </p>
          </section>
          <section className="terms-section">
            <h3 className="terms-section-title">Limitation of Liability</h3>
            <p className="terms-section-paragraph">
              MyBank is not liable for any indirect, incidental, or
              consequential damages arising from the use of our services. Your
              use of our app is at your own risk, and we recommend that you
              exercise caution when managing your financial transactions online.
            </p>
          </section>
          <section className="terms-section">
            <h3 className="terms-section-title">Modifications to the Terms</h3>
            <p className="terms-section-paragraph">
              We reserve the right to update or modify these Terms and
              Conditions at any time without prior notice. Your continued use of
              the app after any such changes constitutes your acceptance of the
              revised Terms.
            </p>
          </section>
        </main>
        <footer className="terms-footer">
          <button className="terms-back-button" onClick={handleBack}>
            Back
          </button>
        </footer>
      </div>
    </section>
  );
}

export default TermsAndConditions;
