import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";

const PatientForm = props => {
  const context = useContext(Context);

  const PatientForm = () => {
    const form = document.getElementById("patient-form");
    // check fields
    const name = form["fullname"].value;
    const ID = form["ID"].value;
    const age = form["Age"].value;
    //const confPass = form["register-conf-pass"].value;
/*
    if (pass === confPass && pass.length >= 8) {
      context.register(name, email, pass);
    }
*/
    context.patientSubmit(age);
    form.reset();
  };

  useEffect(() => {
    const form = document.getElementById("patient-form");
    form.addEventListener("submit", e => {
      e.preventDefault();
      register();
    });
  }, []);

  return (
    <React.Fragment>
      <span>Patient form page</span>
      <form id="patient-form">
        <p> 
          Please fill in all the required fields and draw a spiral as shown in the image below. Once this is complete
          click submit. Your doctor will follow-up with you as required. 
        </p>
        <label htmlFor="register-name">Enter full name</label>
        <input type="text" name="fullname" id="fullname" required />
        <label htmlFor="ID">Enter Patient ID: </label>
        <input name="ID" required/>
        <label htmlFor="Age">Age: </label>
        <input
          type="Age"
          name="Enter-age"
          id="Enter-age"
          required
        />
        <div> TO_DO put the canvas test.js here </div>

        <button>Submit</button>
      </form>
    </React.Fragment>
  );
};

export default Register;
