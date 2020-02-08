import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";

const Landing = props => {
  const context = useContext(Context);

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
       <span>Landing page</span>
       <a href="/login">Login</a>
       <a href="/register">Register</a>
    </React.Fragment>
  );
};

export default Landing;
