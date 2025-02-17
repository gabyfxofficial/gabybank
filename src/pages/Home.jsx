import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [balance] = useState(5000.0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const transactions = [
    { id: 1, type: "Payment", amount: 150.0, date: "Jan 10, 2025" },
    { id: 2, type: "Transfer", amount: 200.0, date: "Jan 11, 2025" },
    { id: 3, type: "Deposit", amount: 500.0, date: "Jan 12, 2025" },
    { id: 4, type: "Payment", amount: 100.0, date: "Jan 13, 2025" },
    { id: 5, type: "Withdrawal", amount: 50.0, date: "Jan 14, 2025" },
    { id: 6, type: "Payment", amount: 70.0, date: "Jan 15, 2025" },
    { id: 7, type: "Transfer", amount: 80.0, date: "Jan 16, 2025" },
  ];

  const totalSpent = transactions
    .filter((tx) => tx.type === "Payment" || tx.type === "Withdrawal")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalDeposited = transactions
    .filter((tx) => tx.type === "Deposit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalTransferred = transactions
    .filter((tx) => tx.type === "Transfer")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="home-container">
      {/* Account Overview Section */}
      <div className="overview-section">
        <div className="overview-card">
          <h2 className="overview-title">Account Overview</h2>
          <div className="overview-info">
            <div className="overview-item">
              <span className="overview-label">Balance:</span>
              <span className="overview-value">${balance.toFixed(2)}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Exchange Rate:</span>
              <span className="overview-value">1 USD = 0.93 EUR</span>
            </div>
          </div>
          <Link to="/deposit" className="overview-button" onClick={scrollToTop}>
            Deposit Funds
          </Link>
        </div>
      </div>

      <div className="separator"></div>

      <div className="totals-section">
        <h2 className="totals-heading">Summary - Last 7 Days</h2>
        <div className="totals-grid">
          <div className="totals-card">
            <h3 className="totals-card-title">Total Spent</h3>
            <p className="totals-card-value">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="totals-card">
            <h3 className="totals-card-title">Total Deposited</h3>
            <p className="totals-card-value">${totalDeposited.toFixed(2)}</p>
          </div>
          <div className="totals-card">
            <h3 className="totals-card-title">Total Transferred</h3>
            <p className="totals-card-value">${totalTransferred.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="separator"></div>

      <div className="transactions-section">
        <h2 className="transactions-heading">Weekly Transactions</h2>
        <table className="transactions-table">
          <thead className="transactions-table-head">
            <tr className="transactions-table-row">
              <th className="transactions-table-th">Date</th>
              <th className="transactions-table-th">Type</th>
              <th className="transactions-table-th">Amount</th>
            </tr>
          </thead>
          <tbody className="transactions-table-body">
            {transactions.map((tx) => (
              <tr key={tx.id} className="transactions-table-row">
                <td className="transactions-table-td">{tx.date}</td>
                <td className="transactions-table-td">{tx.type}</td>
                <td className="transactions-table-td">
                  ${tx.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
