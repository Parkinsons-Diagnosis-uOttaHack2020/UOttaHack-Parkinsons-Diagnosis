import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import "./Auth.css";

const Login = props => {
  const context = useContext(Context);

  const login = async () => {
    const form = document.getElementById("login-form");
    // check fields
    const email = form["login-email"].value;
    const pass = form["login-pass"].value;

    context.login(email, pass).then(success => {
      if (success) {
        console.log(success);
        props.history.push("/user/dashboard");
        form.reset();
      } else {
        console.log(success);
        form.reset();
      }
    });
  };

  useEffect(() => {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", e => {
      e.preventDefault();
      login();
    });

    context.checkIfLoggedIn().then(auth => {
      if (auth) {
        props.history.push("/user/dashboard");
      }
    });
  }, []);

  return (
    <section>
      <form className="auth-form" id="login-form">
        <span className="auth-header">Doctor login</span>
        <label htmlFor="login-email">
          <i className="fas fa-user patient-icon"></i>Email
        </label>
        <input
          type="email"
          name="login-email"
          id="login-email"
          className="input"
          placeholder="Email"
          autoComplete="false"
          required
        />
        <label htmlFor="login-pass">
        <i className="fas fa-key patient-icon"></i>Password</label>
        <input
          type="password"
          name="login-pass"
          id="login-pass"
          className="input"
          placeholder="Password"
          autoComplete="false"
          required
        />
        <button className="btn form-btn">Login</button>
      </form>
    </section>
  );
};

export default Login;
