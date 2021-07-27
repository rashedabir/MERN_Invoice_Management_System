import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          sev<strong>Desk</strong>
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
          <div className="d-flex">
            <Link className="btn btn-outline-primary mx-1" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary mx-1" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
