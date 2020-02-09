import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import "./NewPatient.css";

const NewPatient = props => {
  const context = useContext(Context);

  useEffect(() => {
    const form = document.getElementById("new-patient");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const name = form["patient-name"].value;
      const email = form["patient-email"].value;
      context.createPatient(name, email).then(() => {
        props.closePopup();
      });
    });
  }, []);

  return (
    <React.Fragment>
      <div className="popup">
        <div className="popup-top">
          <span
            className="close-popup"
            onClick={() => {
              props.closePopup();
            }}
          >
            x
          </span>
        </div>
        <div className="popup-bottom">
          <form id="new-patient">
            <input
              type="text"
              name="patient-name"
              className="input"
              placeholder="Patient name"
              required
            />
            <input
              type="email"
              name="patient-email"
              className="input"
              placeholder="Patient email"
              required
            />
            <button className="btn form-btn">Add patient</button>
          </form>
        </div>
      </div>
      <div className="overlay"></div>
    </React.Fragment>
  );
};

export default NewPatient;
