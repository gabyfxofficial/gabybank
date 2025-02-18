import React, { useContext } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Home from "./pages/Home";
import Card from "./pages/Card";
import Deposit from "./pages/Deposit";
import Transfer from "./pages/Transfer";
import MyAccount from "./pages/MyAccount";
import AccountDetails from "./pages/AccountDetails";
import TermsAndConditions from "./pages/TermsAndConditions";
import Updates from "./pages/Updates";
import HelpSupport from "./pages/HelpSupport";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import "./styles/global.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function Layout({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  return (
    <div className="app-layout">
      {isLoggedIn && location.pathname !== "/login" && <Header />}
      <main className="content">{children}</main>
    </div>
  );
}

function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <Login /> : <Navigate to="/home" replace />}
      />
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/card"
        element={
          isLoggedIn ? (
            <Layout>
              <Card />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/transfer"
        element={
          isLoggedIn ? (
            <Layout>
              <Transfer />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/myaccount"
        element={
          isLoggedIn ? (
            <Layout>
              <MyAccount />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/deposit"
        element={
          isLoggedIn ? (
            <Layout>
              <Deposit />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/account-details"
        element={
          isLoggedIn ? (
            <Layout>
              <AccountDetails />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/terms"
        element={
          isLoggedIn ? (
            <Layout>
              <TermsAndConditions />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/updates"
        element={
          isLoggedIn ? (
            <Layout>
              <Updates />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/help"
        element={
          isLoggedIn ? (
            <Layout>
              <HelpSupport />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
