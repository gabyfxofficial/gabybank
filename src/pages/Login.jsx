import React, { useState, useContext } from "react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    setNotification({ message: "", type: "" });
    if (!trimmedUsername || !trimmedPassword) {
      setNotification({
        message: "Invalid username or password.",
        type: "error",
      });
      return;
    }
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      const user = data.users.find(
        (user) =>
          user.username === trimmedUsername && user.password === trimmedPassword
      );
      if (user) {
        setNotification({ message: "Login successful!", type: "success" });
        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phone: user.phone,
          country: user.address?.country || "N/A",
          city: user.address?.city || "N/A",
          birthDate: user.birthDate,
          bank: user.bank, // Se preia obiectul bank (inclusiv IBAN, currency etc.)
        };
        login("mockToken123", userData, trimmedUsername);
        navigate("/home");
      } else {
        setNotification({
          message: "Invalid username or password.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({ message: "Error fetching user data.", type: "error" });
      console.error("Error fetching user data:", error);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (notification.message) setNotification({ message: "", type: "" });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (notification.message) setNotification({ message: "", type: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <form className="login-form" onSubmit={handleLogin} noValidate>
          <div className="input-group">
            <label className="input-label" htmlFor="username">
              <FaUserAlt className="input-icon" /> Username
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="password">
              <FaLock className="input-icon" /> Password
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input-field"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
