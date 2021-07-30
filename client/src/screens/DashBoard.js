import React from "react";
import { Link } from "react-router-dom";
import Tabs from "../components/Tabs";

function DashBoard() {
  return (
    <div className="container py-5">
      <h3 className="dashboard_heading py-3 px-2">
        <i className="fas fa-tachometer-alt"></i> Dashboard
      </h3>
      <div className="row">
        <div className="col-lg-8 my-2">
          <div className="dasboard_tabs p-3">
            <Tabs />
          </div>
        </div>
        <div className="col-lg-4 my-2">
          <div className="dashbord_help p-3">
            <img
              src="https://rashed-abir.web.app/static/media/rashed%20abir.bad348d4.JPEG"
              alt="rashed"
              width="25%"
            />
            <h5 className="text-start">Welcome to Entkreis</h5>
            <p className="text-start">
              My name is Rashed and I am your contact at Entkreis.
            </p>
            <p className="text-start help_button">
              <Link to="/help">
                <i className="far fa-question-circle"></i> I need help
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
