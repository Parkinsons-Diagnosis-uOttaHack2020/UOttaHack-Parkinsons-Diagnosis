import React, { useState } from "react";
import Context from "./Context";
//import * as firebase from "firebase";

const GlobalStates = props => {
  const [arr, setArr] = useState([]);

  const sendImage = async obj => {
    // post request
    console.log(JSON.stringify(obj));
    const options = {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    };
    let res = await fetch("http://localhost:8000/send-image", options);
    console.log(res);
    //setArr(array.img);
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
