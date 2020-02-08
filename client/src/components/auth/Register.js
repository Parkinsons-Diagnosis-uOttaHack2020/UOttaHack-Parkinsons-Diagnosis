import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";

const Register = props => {
  const context = useContext(Context);

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
       <span>Register page</span>
        <form id="register-form"></form>
    </React.Fragment>
  );
};

export default Register;
