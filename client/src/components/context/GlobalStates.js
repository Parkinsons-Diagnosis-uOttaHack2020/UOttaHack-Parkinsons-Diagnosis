import React, { useState } from "react";
import Context from "./Context";
//import * as firebase from "firebase";

const GlobalStates = props => {
  const [state, setState] = useState(null);

  const sendImage = async (arr, width, height)  => {
    let obj = {
      img: arr,
      w: width,
      h: height
    }
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
    setState(resObject.result);
  };

  return (
    <Context.Provider
      value={{
        state: state,
        sendImage: sendImage
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
