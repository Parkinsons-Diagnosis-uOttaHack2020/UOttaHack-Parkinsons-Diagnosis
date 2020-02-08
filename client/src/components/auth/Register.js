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
    const confPass = form["register-conf-pass"].value;

    if (pass === confPass && pass.length >= 8) {
      context.register(name, email, pass);
    }
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
      <span>Register page</span>
      <form id="register-form">
        <label htmlFor="register-name">Full name</label>
        <input type="text" name="register-name" id="register-name" />
        <label htmlFor="register-email">Email</label>
        <input type="email" name="register-email" id="register-email" />
        <label htmlFor="register-pass">Password</label>
        <input type="password" name="register-pass" id="register-pass" />)
        <label htmlFor="register-conf-pass">Confirm password</label>
        <input
          type="password"
          name="register-conf-pass"
          id="register-conf-pass"
        />
        <button>Register</button>
      </form>
    </React.Fragment>
  );
};

export default Register;
