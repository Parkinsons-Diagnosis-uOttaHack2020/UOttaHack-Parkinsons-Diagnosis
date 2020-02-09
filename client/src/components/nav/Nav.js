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
          <a href="/">PM'D</a>

        </div>
        <div className="nav-links">
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
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
