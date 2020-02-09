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
    <section className="landing-section">
        <div className="left-landing">
            <span className="header">Parkinson diagnosis</span>
            <span className="subheader">A machine learning powerded and simple diagnosis for the Parkinson disease.</span>
            <button className="btn header-btn">Get a license</button>
        </div>
        <img src="https://i.ya-webdesign.com/images/transparent-network-19.png" className="bg" alt="bg"/>
    </section>
  );
};

export default Landing;
