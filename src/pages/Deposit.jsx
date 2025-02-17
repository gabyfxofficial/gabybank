import React, { useState } from "react";
import "../styles/deposit.css";

function Deposit() {
  const [activeTab, setActiveTab] = useState("credit");

  const renderCreditForm = () => (
    <form className="deposit-form">
      <h3 className="deposit-form-title">Deposit with Credit Card</h3>
      <div className="form-group">
        <label className="form-label">Card Number</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter card number"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Expiry Date</label>
        <input className="form-input" type="text" placeholder="MM/YY" />
      </div>
      <div className="form-group">
        <label className="form-label">CVV</label>
        <input className="form-input" type="text" placeholder="Enter CVV" />
      </div>
      <div className="form-group">
        <label className="form-label">Amount</label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount"
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderBankForm = () => (
    <form className="deposit-form">
      <h3 className="deposit-form-title">Deposit via Bank Transfer</h3>
      <div className="form-group">
        <label className="form-label">Bank Name</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter your bank's name"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Account Number</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter your account number"
        />
      </div>
      <div className="form-group">
        <label className="form-label">IBAN / SWIFT</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter IBAN or SWIFT code"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Amount</label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount"
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderPaypalForm = () => (
    <form className="deposit-form">
      <h3 className="deposit-form-title">Deposit via PayPal</h3>
      <div className="form-group">
        <label className="form-label">PayPal Email</label>
        <input
          className="form-input"
          type="email"
          placeholder="Enter your PayPal email"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Amount</label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount"
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderCryptoForm = () => (
    <form className="deposit-form">
      <h3 className="deposit-form-title">Deposit via Cryptocurrency</h3>
      <div className="form-group">
        <label className="form-label">Select Cryptocurrency</label>
        <select className="form-input">
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="litecoin">Litecoin (LTC)</option>
          <option value="usdt">Tether (USDT)</option>
          <option value="usdc">USD Coin (USDC)</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Amount (USD)</label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount in USD"
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderWalletForm = () => (
    <form className="deposit-form">
      <h3 className="deposit-form-title">Deposit via Mobile Wallet</h3>
      <div className="form-group">
        <label className="form-label">Wallet Provider</label>
        <select className="form-input">
          <option value="applepay">Apple Pay</option>
          <option value="googlepay">Google Pay</option>
          {/* Samsung Pay removed as per request */}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Amount</label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount"
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderForm = () => {
    switch (activeTab) {
      case "credit":
        return renderCreditForm();
      case "bank":
        return renderBankForm();
      case "paypal":
        return renderPaypalForm();
      case "crypto":
        return renderCryptoForm();
      case "wallet":
        return renderWalletForm();
      default:
        return renderCreditForm();
    }
  };

  return (
    <section className="deposit-container">
      <h2 className="deposit-heading">Deposit Funds</h2>
      <nav className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "credit" ? "active" : ""}`}
          onClick={() => setActiveTab("credit")}
        >
          Credit Card
        </button>
        <button
          className={`tab-button ${activeTab === "bank" ? "active" : ""}`}
          onClick={() => setActiveTab("bank")}
        >
          Bank Transfer
        </button>
        <button
          className={`tab-button ${activeTab === "paypal" ? "active" : ""}`}
          onClick={() => setActiveTab("paypal")}
        >
          PayPal
        </button>
        <button
          className={`tab-button ${activeTab === "crypto" ? "active" : ""}`}
          onClick={() => setActiveTab("crypto")}
        >
          Crypto
        </button>
        <button
          className={`tab-button ${activeTab === "wallet" ? "active" : ""}`}
          onClick={() => setActiveTab("wallet")}
        >
          Mobile Wallet
        </button>
      </nav>
      <section className="form-content">{renderForm()}</section>
    </section>
  );
}

export default Deposit;
