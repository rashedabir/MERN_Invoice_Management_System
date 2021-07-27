import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const fullname = firstname + " " + lastname;

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", {
        name: fullname,
        email: email,
        password: password,
        rePassword: rePassword,
        company: company,
        phone: phone,
        country: country,
      });

      localStorage.setItem("firstLogin", true);
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="container p-5 register_box">
      <ToastContainer />
      <h3 className="pb-4 text-center">
        <strong>Entkreis</strong>
      </h3>
      <form
        onSubmit={registerSubmit}
        className="row g-3 needs-validation"
        novalidate
      >
        <div className="col-md-6">
          <label for="validationCustom03" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <label for="validationCustom03" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <label for="validationCustom03" className="form-label">
            Password*
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <label for="validationCustom03" className="form-label">
            Repeat Password*
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Repeat Password"
            id="exampleInputPassword1"
            onChange={(e) => {
              setRePassword(e.target.value);
            }}
          />
        </div>
        <div className="col-md-12">
          <label for="validationCustom03" className="form-label">
            Comapny Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Comapny Name"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <label for="validationCustom05" className="form-label">
            Phone*
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <label for="validationCustom04" className="form-label">
            Country*
          </label>
          <select
            className="form-select"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            <option selected disabled>
              Choose
            </option>
            <option>Bangladesh</option>
          </select>
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
