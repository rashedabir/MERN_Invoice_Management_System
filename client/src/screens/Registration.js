import React from "react";

function Registration() {
  return (
    <div className="container p-5 form_box">
      <h3 className="pb-4 text-center">
        sev<strong>Desk</strong>
      </h3>
      <form className="row g-3 needs-validation" novalidate>
        <div className="col-md-6">
          <label for="validationCustom03" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            placeholder="First Name"
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-6">
          <label for="validationCustom03" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            placeholder="Last Name"
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-12">
          <label for="validationCustom03" className="form-label">
            Your Email*
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Your Email"
              required
            />
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
        </div>
        <div className="col-md-12">
          <label for="validationCustom03" className="form-label">
            Comapny Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Comapny Name"
            id="validationCustom03"
          />
          <div className="invalid-feedback">Please provide a valid city.</div>
        </div>
        <div className="col-md-6">
          <label for="validationCustom05" className="form-label">
            Phone*
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom05"
            placeholder="Phone"
            required
          />
          <div className="invalid-feedback">Please provide a valid zip.</div>
        </div>
        <div className="col-md-6">
          <label for="validationCustom04" className="form-label">
            Country*
          </label>
          <select className="form-select" id="validationCustom04" required>
            <option selected disabled value="">
              Choose...
            </option>
            <option>...</option>
          </select>
          <div className="invalid-feedback">Please select a valid state.</div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck"
            />
            <label className="form-check-label" for="invalidCheck">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
