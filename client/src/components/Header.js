import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [user] = state.userAPI.user;

  const logOut = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsLogged(false);
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to={isLogged ? "/dashboard" : "/"}>
          <strong>Entkreis</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isLogged ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/customer"
                >
                  Customer
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/invoice"
                >
                  Invoice
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/functions"
                >
                  Functions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prices">
                  Prices
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sector">
                  Industry Sectors
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/service">
                  Service
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/advisors">
                  For tax advisors
                </Link>
              </li>
            </ul>
          )}
          {isLogged ? (
            <ul className="navbar-nav mb-lg-0">
              <li className="nav-item text-light align-items-center">
                <i className="fas fa-user-circle mt-2 user_icon"></i>{" "}
                <span>{user.email}</span>
              </li>
              <li>
                <button className="btn btn-danger px-3 mx-3" onClick={logOut}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </ul>
          ) : (
            <div className="d-flex">
              <Link className="btn btn-outline-primary mx-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
