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

  const button = {
        backgroundColor: "lightblue",
        fontFamily:"Georgia",
        flexDirection:'row',
        height:"60px",
        width: "250px",
        fontSize: "25px",
        alignItems:'center',
        justifyContent:'center'
      };
  const text = {
        fontFamily: "Georgia"
  }

  return (

    <section>
    
      <span> 
      <div style={text}>
      Welcome to the Parkinson's Machine Learning Detector! (PM'D). This web app allows doctors to recommend a simple test 
      for early detection of Parkinson's in patients. Patients are asked to draw a simple spiral which is then passed through an 
      API that runs a python script. This then processes it through machine learning and determines with an 85% accuracy whether 
      Parkinson's is present or not. 
      </div>
      <br></br>
      <div style={text}> Press either the login or register button below to get started and start screening </div>
      <div id="buttonContainer">
        <button style={button}>  <a href="/login">LOGIN </a> </button>

        <button  style={button}> <a href="/register">REGISTER</a> </button>
      </div>
      </span>
      
    </section>
  );
};

export default Landing;
