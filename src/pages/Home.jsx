// Home.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useSelector } from "react-redux";
import "../styles/home.css";

function Home() {
  const { userData } = useContext(AuthContext);
  const fiatBalance = useSelector((state) => state.fiat);
  const btcBalance = useSelector((state) => state.btc);
  const ethBalance = useSelector((state) => state.eth);
  const transactions = useSelector((state) => state.transactions);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filtrăm tranzacțiile pentru a afișa doar cele de tip "Transfer" și "Deposit"
  const filteredTransactions = transactions.filter(
    (tx) => tx.type === "Transfer" || tx.type === "Deposit"
  );

  const formatBalance = (balance) =>
    balance % 1 === 0 ? balance.toFixed(2) : balance;

  return (
    <div className="home-container">
      {/* Account Overview Section */}
      <div className="overview-section">
        <div className="overview-card">
          <h2 className="overview-title">Account Overview</h2>
          <div className="overview-info">
            <div className="overview-item">
              <span className="overview-label">Fiat Balance:</span>
              <span className="overview-value">
                {fiatBalance.toFixed(2)} {userData?.bank?.currency || "$"}
              </span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Bitcoin Balance:</span>
              <span className="overview-value">
                {formatBalance(btcBalance)} BTC
              </span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Ethereum Balance:</span>
              <span className="overview-value">
                {formatBalance(ethBalance)} ETH
              </span>
            </div>
            <div className="overview-item">
              <span className="overview-label">IBAN:</span>
              <span className="overview-value">
                {userData?.bank?.iban || "N/A"}
              </span>
            </div>
          </div>
          <Link to="/deposit" className="overview-button" onClick={scrollToTop}>
            Deposit Funds
          </Link>
        </div>
      </div>

      <div className="separator"></div>

      {/* Transactions Section */}
      <div className="transactions-section">
        <h2 className="transactions-title">My Transactions</h2>
        {filteredTransactions.length > 0 ? (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.type}</td>
                  <td>
                    {tx.amount.toFixed(2)} {userData?.bank?.currency || "$"}
                  </td>
                  <td>{tx.method ? tx.method : "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-transactions">No transactions available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
