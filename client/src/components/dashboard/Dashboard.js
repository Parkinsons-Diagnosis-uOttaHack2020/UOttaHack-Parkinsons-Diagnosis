import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";

const Dashboard = props => {
  const context = useContext(Context);
  const user = context.user;

  useEffect(() => {
    if (!context.user && !context.currentUser) {
      props.history.push("/login");
    }
  }, [user]);

  return (
    <React.Fragment>
      <span>Dashboard page</span>
      {user ? (
        <React.Fragment>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </React.Fragment>
      ) : null}
      <button
        onClick={() => {
          context.signout();
          props.history.push("/");
        }}
      >
        Sign out
      </button>
    </React.Fragment>
  );
};

export default Dashboard;
