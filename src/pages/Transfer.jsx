import React, { useState, useEffect } from "react";
import "../styles/transfer.css";

function Transfer() {
  const [activeTab, setActiveTab] = useState("IBAN");
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [formData, setFormData] = useState({
    recipient: "",
    fullName: "",
    amount: "",
    reason: "",
  });

  // Preluăm utilizatorii din dummyjson și filtrăm utilizatorul logat
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        const username = localStorage.getItem("username");
        const logged = data.users.find((u) => u.username === username);
        setLoggedUser(logged);
        // Excludem utilizatorul logat din lista destinatarilor
        const filtered = data.users.filter((u) => u.username !== username);
        setUsers(filtered);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    }
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (e) => {
    setActiveTab(e.target.value);
    // Resetăm câmpul recipient atunci când se schimbă metoda
    setFormData({ ...formData, recipient: "", fullName: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica de transfer poate fi extinsă aici
    console.log("Transfer Data:", { method: activeTab, ...formData });
    alert("Transfer initiated! Check console for details.");
  };

  return (
    <section className="transfer-section">
      <div className="transfer-container">
        <h2 className="transfer-heading">Transfer Funds</h2>
        <div className="transfer-type-dropdown">
          <label className="transfer-type-label">Method:</label>
          <select
            value={activeTab}
            onChange={handleTabChange}
            className="transfer-type-select"
          >
            <option value="IBAN">IBAN</option>
            <option value="User">Friends</option>
            <option value="Phone">Phone Number</option>
            <option value="BTC">BTC Address</option>
            <option value="ETH">ETH Address</option>
          </select>
        </div>
        <form className="transfer-form" onSubmit={handleSubmit}>
          {activeTab === "User" ? (
            <div className="form-group">
              <label className="form-label">Select Recipient</label>
              <select
                name="recipient"
                className="form-input"
                value={formData.recipient}
                onChange={handleInputChange}
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.username}>
                    {u.firstName} {u.lastName} ({u.bank.currency})
                  </option>
                ))}
              </select>
            </div>
          ) : activeTab === "IBAN" ? (
            <>
              {/* Secțiune pentru nume complet */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Recipient IBAN Address</label>
                <input
                  type="text"
                  name="recipient"
                  className="form-input"
                  placeholder="Enter IBAN address"
                  value={formData.recipient}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Bank Name"
                  value={loggedUser ? loggedUser.bank.cardType : ""}
                  readOnly
                />
              </div>
            </>
          ) : (
            <div className="form-group">
              <label className="form-label">
                {activeTab === "Phone"
                  ? "Recipient Phone Number"
                  : `Recipient ${activeTab} Address`}
              </label>
              <input
                type="text"
                name="recipient"
                className="form-input"
                placeholder={
                  activeTab === "Phone"
                    ? "Enter phone number"
                    : `Enter ${activeTab} address`
                }
                value={formData.recipient}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">
              Amount ({loggedUser ? loggedUser.bank.currency : "USD"})
            </label>
            <input
              type="number"
              name="amount"
              className="form-input"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Reason for Transfer</label>
            <input
              type="text"
              name="reason"
              className="form-input"
              placeholder="Enter reason for transfer"
              value={formData.reason}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="transfer-button">
            Transfer
          </button>
        </form>
      </div>
    </section>
  );
}

export default Transfer;
