import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import "./Landing.css";

const Landing = props => {
  const context = useContext(Context);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    context.checkIfLoggedIn().then(auth => {
      setAuth(auth);
    });
  }, []);

  return (
    <section>
      <span>Landing</span>
      
    </section>
  );
};

export default Landing;
