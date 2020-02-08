import React, { useState } from "react";
import Context from "./Context";
//import * as firebase from "firebase";

const GlobalStates = props => {
  const [arr, setArr] = useState([]);

  const sendImage = async obj => {
    // post request
    const options = {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = await fetch("http://localhost:8000/send-image", options);
    let resObject = await response.json();
    setArr(resObject.img);
  };

  return (
    <Context.Provider
      value={{
        arr: arr,
        sendImage: sendImage
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
