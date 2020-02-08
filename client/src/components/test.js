import React, { useState, useEffect, useContext } from "react";
import Context from "./context/Context";
import TEMP from "./TEMP.json";

const Test = props => {
  const context = useContext(Context);
  const arr = context.arr;
  let objToSend = TEMP;

  return (
    <React.Fragment>
      <button
        onClick={() => {
          context.sendImage(objToSend);
        }}
      >
        Envoyer
      </button>
      <span>{arr.length != 0 ? arr.length : "0"}</span>
    </React.Fragment>
  );
};

export default Test;
