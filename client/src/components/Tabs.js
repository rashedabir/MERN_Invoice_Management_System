import React, { useState } from "react";
import { Link } from "react-router-dom";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div>
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <i className="fas fa-funnel-dollar income"></i> Incomes
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <i className="fas fa-outdent outgoing"></i> Outgoings
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h4>Test our Incomes functions</h4>
          <ul className="list-group list-group-flush py-3">
            <li className="list-group-item pb-2 d-flex justify-content-between align-items-center">
              <Link to="/profile" className="pb-0 mb-0">
                Complete company data
              </Link>
              <i class="fas fa-arrow-circle-right"></i>
            </li>
            <li className="list-group-item pb-2 d-flex justify-content-between align-items-center">
              <Link to="/profile" className="pb-0 mb-0">
                Upload your own stationary
              </Link>
              <i class="fas fa-arrow-circle-right"></i>
            </li>
            <li className="list-group-item pb-2 d-flex justify-content-between align-items-center">
              <Link to="/addinvoice" className="pb-0 mb-0">
                Write & complete the invoice
              </Link>
              <i class="fas fa-arrow-circle-right"></i>
            </li>
          </ul>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h4>Test our Outgoings functions</h4>
          <ul className="list-group list-group-flush py-3">
            <li className="list-group-item pb-2 d-flex justify-content-between align-items-center">
              <Link to="/recipet" className="pb-0 mb-0">
                Upload First Bank Reciept
              </Link>
              <i class="fas fa-arrow-circle-right"></i>
            </li>
            <li className="list-group-item pb-2 d-flex justify-content-between align-items-center">
              <Link to="/banks" className="pb-0 mb-0">
                Link Bank Account
              </Link>
              <i class="fas fa-arrow-circle-right"></i>
            </li>
            <li className="list-group-item pb-2 d-flex justify-content-between align-items-center">
              <Link to="/reciept" className="pb-0 mb-0">
                Mark the reciept as paid
              </Link>
              <i class="fas fa-arrow-circle-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
