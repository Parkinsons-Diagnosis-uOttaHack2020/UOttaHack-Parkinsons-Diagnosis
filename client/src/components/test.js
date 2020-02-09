import React, { useState, useEffect, useContext } from "react";
import Context from "./context/Context";
import TEMP from "./TEMP.json";
import $ from "jquery";
import "./test.css";

const Test = props => {
  const context = useContext(Context);
  const [ctx, setCtx] = useState(null);

  const state = context.state;
  let objToSend = TEMP;

  var mousePressed = false;
  var lastX, lastY;
  
  function start() {
      $('#myCanvas').mousedown(function (e) {
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
      if (mousePressed) {
          ctx.beginPath();
          ctx.strokeStyle = "black";
          ctx.lineWidth = 4
          ctx.lineJoin = "round";
          ctx.moveTo(lastX, lastY);
          if(!isDown) {ctx.moveTo(x, y);}
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

  function getPixels() {
    // Get the CanvasPixelArray from the given coordinates and dimensions.
    var imgd = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var pix = imgd.data;
    console.log(pix);

    var result = [];
    var max = 0;
    for(let i = 0; i < pix.length; i += 4) {
      let element = pix[i+3];
      if (pix[i+3] == 255) {max++;}
      result.push(element);
    }
    console.log(max);
    return result;
    // // Loop over each pixel and invert the color.
    // for (var i = 0, n = pix.length; i < n; i += 4) {
    //     pix[i  ] = 255 - pix[i  ]; // red
    //     pix[i+1] = 255 - pix[i+1]; // green
    //     pix[i+2] = 255 - pix[i+2]; // blue
    //     // i+3 is alpha (the fourth element)
    // }

  }

  useEffect(() => {
    if (ctx) {
      start();      
    } else {
      setCtx(document.getElementById('myCanvas').getContext("2d"));
    }

  }, [ctx]);

  return (
    <React.Fragment>
      <div className="canvasWrapper">
        <canvas id="myCanvas" width="500" height="500"></canvas>
      </div>
      <button
        onClick={() => {
          //context.sendImage(objToSend);
          
          context.sendImage(getPixels(), ctx.canvas.width, ctx.canvas.height);
          clearArea();

        }}
      >
        Envoyer
      </button>
      <span>{state !== null ? `${state}` : "Nothing"}</span>
    </React.Fragment>
  );
};

export default Test;
