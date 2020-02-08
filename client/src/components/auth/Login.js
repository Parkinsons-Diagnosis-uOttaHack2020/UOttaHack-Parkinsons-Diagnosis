import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";

const Login = props => {
  const context = useContext(Context);

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
       <span>Login page</span>
        <form id="login-form"></form>
    </React.Fragment>
  );
};

export default Login;
