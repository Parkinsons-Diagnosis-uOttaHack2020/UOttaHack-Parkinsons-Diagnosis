import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import "./Nav.css";

const Nav = props => {
  const context = useContext(Context);
  const [auth, setAuth] = useState(false);
  const user = context.user;

  useEffect(() => {
    context.checkIfLoggedIn().then(auth => {
      setAuth(auth);
    });
  }, [user]);

  return (
    <React.Fragment>
      <nav>
        <div className="logo">
          <a href="/">Parkinson Diagnosis</a>
        </div>
        <div className="nav-links">
          {auth ? (
            <React.Fragment>
              <a href="/user/dashboard"><i className="fas fa-user-md nav-icon"></i>My account</a>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </React.Fragment>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
