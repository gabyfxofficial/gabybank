// Transfer.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  withdrawFiat,
  withdrawBtc,
  withdrawEth,
  addTransaction,
} from "../redux/store";
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

  const dispatch = useDispatch();
  const fiatBalance = useSelector((state) => state.fiat);
  const btcBalance = useSelector((state) => state.btc);
  const ethBalance = useSelector((state) => state.eth);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        const username = localStorage.getItem("username");
        const logged = data.users.find((u) => u.username === username);
        setLoggedUser(logged);
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
    setFormData({ ...formData, recipient: "", fullName: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    const currentDate = new Date().toLocaleDateString();

    // Verificăm soldul și efectuăm retragerea în funcție de metodă
    if (activeTab === "BTC") {
      if (amount > btcBalance) {
        alert("Insufficient BTC balance for this transfer.");
        return;
      }
      dispatch(withdrawBtc(amount));
    } else if (activeTab === "ETH") {
      if (amount > ethBalance) {
        alert("Insufficient ETH balance for this transfer.");
        return;
      }
      dispatch(withdrawEth(amount));
    } else {
      // Pentru IBAN, User și Phone se presupune transfer fiat
      if (amount > fiatBalance) {
        alert("Insufficient fiat balance for this transfer.");
        return;
      }
      dispatch(withdrawFiat(amount));
    }

    // Determinăm descrierea metodei în funcție de activeTab
    let methodDescription = "";
    switch (activeTab) {
      case "IBAN":
        methodDescription = "IBAN";
        break;
      case "User":
        methodDescription = "Friends";
        break;
      case "Phone":
        methodDescription = "Phone Number";
        break;
      case "BTC":
        methodDescription = "BTC Address";
        break;
      case "ETH":
        methodDescription = "ETH Address";
        break;
      default:
        methodDescription = activeTab;
    }

    // Adăugăm tranzacția în store, inclusiv metoda utilizată
    dispatch(
      addTransaction({
        id: Date.now(),
        type: "Transfer",
        amount: amount,
        date: currentDate,
        method: methodDescription,
      })
    );

    console.log("Transfer Data:", { method: activeTab, ...formData });
    alert("Transfer initiated! Check console for details.");
    setFormData({ recipient: "", fullName: "", amount: "", reason: "" });
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
