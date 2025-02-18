// Deposit.jsx
import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import {
  depositFiat,
  depositBtc,
  depositEth,
  addTransaction,
} from "../redux/store"; // Am importat și addTransaction
import {
  FaCreditCard,
  FaUniversity,
  FaPaypal,
  FaBitcoin,
  FaMobileAlt,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext"; // Importăm contextul
import "../styles/deposit.css";

function Deposit() {
  const { userData } = useContext(AuthContext);
  const [activeMethod, setActiveMethod] = useState("credit");
  const [depositAmount, setDepositAmount] = useState("");
  const [cryptoType, setCryptoType] = useState("bitcoin"); // Tipul de criptomonedă selectat
  const dispatch = useDispatch();

  const depositMethods = [
    { id: "credit", label: "Credit Card", icon: <FaCreditCard size={32} /> },
    { id: "bank", label: "Bank Transfer", icon: <FaUniversity size={32} /> },
    { id: "paypal", label: "PayPal", icon: <FaPaypal size={32} /> },
    { id: "crypto", label: "Crypto", icon: <FaBitcoin size={32} /> },
    { id: "wallet", label: "Mobile Wallet", icon: <FaMobileAlt size={32} /> },
  ];

  const handleMethodChange = (event) => {
    setActiveMethod(event.target.value);
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    // Obținem data curentă
    const currentDate = new Date().toLocaleDateString();
    let methodDescription = "";

    if (activeMethod === "crypto") {
      if (cryptoType === "bitcoin") {
        dispatch(depositBtc(amount));
        methodDescription = "Crypto - Bitcoin";
        alert(`Successfully deposited ${amount.toFixed(8)} BTC`);
      } else if (cryptoType === "ethereum") {
        dispatch(depositEth(amount));
        methodDescription = "Crypto - Ethereum";
        alert(`Successfully deposited ${amount.toFixed(8)} ETH`);
      }
    } else {
      dispatch(depositFiat(amount));
      // Obținem descrierea metodei din depositMethods
      const methodObj = depositMethods.find((m) => m.id === activeMethod);
      methodDescription = methodObj ? methodObj.label : activeMethod;
      alert(
        `Successfully deposited ${amount.toFixed(2)} ${
          userData?.bank?.currency || "USD"
        }`
      );
    }

    // Adăugăm tranzacția în store
    dispatch(
      addTransaction({
        id: Date.now(),
        type: "Deposit",
        amount,
        date: currentDate,
        method: methodDescription,
      })
    );
    setDepositAmount("");
  };

  const renderCreditForm = () => (
    <form className="deposit-form" onSubmit={handleDeposit}>
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
        <label className="form-label">
          Amount ({userData?.bank?.currency || "USD"})
        </label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderBankForm = () => (
    <form className="deposit-form" onSubmit={handleDeposit}>
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
        <label className="form-label">
          Amount ({userData?.bank?.currency || "USD"})
        </label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderPaypalForm = () => (
    <form className="deposit-form" onSubmit={handleDeposit}>
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
        <label className="form-label">
          Amount ({userData?.bank?.currency || "USD"})
        </label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderCryptoForm = () => (
    <form className="deposit-form" onSubmit={handleDeposit}>
      <h3 className="deposit-form-title">Deposit via Cryptocurrency</h3>
      <div className="form-group">
        <label className="form-label">Select Cryptocurrency</label>
        <select
          className="form-input"
          value={cryptoType}
          onChange={(e) => setCryptoType(e.target.value)}
        >
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">
          Amount ({userData?.bank?.currency || "USD"})
        </label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderWalletForm = () => (
    <form className="deposit-form" onSubmit={handleDeposit}>
      <h3 className="deposit-form-title">Deposit via Mobile Wallet</h3>
      <div className="form-group">
        <label className="form-label">Wallet Provider</label>
        <select className="form-input">
          <option value="applepay">Apple Pay</option>
          <option value="googlepay">Google Pay</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">
          Amount ({userData?.bank?.currency || "USD"})
        </label>
        <input
          className="form-input"
          type="number"
          placeholder="Enter amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
      </div>
      <button type="submit" className="deposit-button">
        Deposit
      </button>
    </form>
  );

  const renderForm = () => {
    switch (activeMethod) {
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
      <div className="dropdown-container">
        <select
          className="method-dropdown"
          value={activeMethod}
          onChange={handleMethodChange}
        >
          {depositMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.label}
            </option>
          ))}
        </select>
      </div>
      <section className="form-content">{renderForm()}</section>
    </section>
  );
}

export default Deposit;
