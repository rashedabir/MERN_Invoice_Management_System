import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container p-5 text-center form_box">
      <h3 className="pb-4">
        sev<strong>Desk</strong>
      </h3>
      <form>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="exampleInputPassword1"
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
