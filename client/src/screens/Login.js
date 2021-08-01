import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/dashboard";
      toast.success("Wellcome");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="container p-5 text-center form_box">
      <h3 className="pb-4">
        <strong>Entkreis</strong>
      </h3>
      <form onSubmit={loginSubmit}>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <br></br>
        <br></br>
        <Link>Problems with the Login?</Link>
      </form>
      <p>or</p>
      <Link className="btn btn-light" to="/register">
        Create Free Account
      </Link>
    </div>
  );
}

export default Login;
