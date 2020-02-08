import React, { useState, useEffect, useContext } from "react";
import Context from "./context/Context";
import TEMP from "./TEMP.json";
import $ from "jquery";

const Test = props => {
  const context = useContext(Context);
  const arr = context.arr;
  let objToSend = TEMP;

  var mousePressed = false;
  var lastX, lastY;
  var ctx;
  
  function start() {
      ctx = document.getElementById('myCanvas').getContext("2d");
  
      $('#myCanvas').mouseover(function (e) {
          mousePressed = true;
          Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
      });
  
      $('#myCanvas').mousemove(function (e) {
          if (mousePressed) {
              Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
          }
      });
  
      $('#myCanvas').mouseup(function (e) {
          mousePressed = false;
      });
          $('#myCanvas').mouseleave(function (e) {
          mousePressed = false;
      });
  }
  
  function Draw(x, y, isDown) {
      if (true) {
          ctx.beginPath();
          ctx.strokeStyle = "black";
          ctx.lineWidth = 1.5;
          ctx.lineJoin = "round";
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(x, y);
          ctx.closePath();
          ctx.stroke();
      }
      lastX = x; lastY = y;
  }
      
  function clearArea() {
      // Use the identity matrix while clearing the canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <React.Fragment>
      <canvas id="myCanvas"></canvas>
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
