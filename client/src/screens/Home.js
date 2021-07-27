import React from "react";
import { Link } from "react-router-dom";
import home from "../assets/home.jpg";

function Home() {
  return (
    <div className="home">
      <img src={home} alt="" />
      <div className="home_details">
        <h3>sevDesk - Hassle-free Accounting!</h3>
        <p>Create invoices & estimates and automate your accounting</p>
        <Link to="/register" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
