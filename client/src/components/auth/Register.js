import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";

const Register = props => {
  const context = useContext(Context);

  const register = () => {
    const form = document.getElementById("register-form");
    // check fields
    const name = form["register-name"].value;
    const email = form["register-email"].value;
    const pass = form["register-pass"].value;

    if (pass.length >= 8) {
      context.register(name, email, pass);
    }

    form.reset();
  };

  useEffect(() => {
    const form = document.getElementById("register-form");
    form.addEventListener("submit", e => {
      e.preventDefault();
      register();
    });
  }, []);

  return (
    <React.Fragment>
      <section>
        <form className="auth-form" id="register-form">
          <span className="auth-header">Doctor signup</span>
          <label htmlFor="register-name">
            <i className="fas fa-user patient-icon"></i>Full name
          </label>
          <input
            type="text"
            name="register-name"
            id="register-name"
            className="input"
            placeholder="Full name"
            autoComplete="false"
            required
          />
          <label htmlFor="register-email">
            <i className="fas fa-user patient-icon"></i>Email
          </label>
          <input
            type="email"
            name="register-email"
            id="register-email"
            className="input"
            placeholder="Email"
            autoComplete="false"
            required
          />
          <label htmlFor="register-pass">
            <i className="fas fa-key patient-icon"></i>Password
          </label>
          <input
            type="password"
            name="register-pass"
            id="register-pass"
            className="input"
            placeholder="Password"
            autoComplete="false"
            required
          />
          <button className="btn form-btn">Register</button>
        </form>
      </section>
    </React.Fragment>
  );
};

export default Register;
