import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";

const Dashboard = props => {
  const context = useContext(Context);
  const user = context.user;

  useEffect(() => {
    context.checkIfLoggedIn().then(auth => {
      if (!auth) {
        props.history.push("/login");
      } else {
        context.getUser();
      }
    });
  }, [user]);

  return (
    <React.Fragment>
      {user ? (
        <React.Fragment>
          <span>Dashboard page</span>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <button
            onClick={() => {
              context.signout();
              props.history.push("/");
            }}
          >
            Sign out
          </button>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default Dashboard;
