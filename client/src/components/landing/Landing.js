import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";

const Landing = props => {
  const context = useContext(Context);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    context.checkIfLoggedIn().then(auth => {
      setAuth(auth);
    });
  }, []);

  return (
    <React.Fragment>
      <span>Landing page</span>
      {auth ? (
        <React.Fragment>
          <a href="/user/dashboard">My account</a>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Landing;
