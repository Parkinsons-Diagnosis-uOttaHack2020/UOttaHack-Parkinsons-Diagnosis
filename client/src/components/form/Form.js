import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import "./Form.css";

const Form = props => {
  const context = useContext(Context);
  const [valid, setValid] = useState(false);

  const parseUrl = async () => {
    const url = window.location.href;
    let drId = "";
    let clId = "";
    let currentSet = -1;
    for (let i = 0; i < parseInt(url.length); i++) {
      if (url[i] === "=") {
        i++;
        currentSet++;
        while (url[i] !== "_") {
          if (currentSet === 0) {
            drId += url[i];
            i++;
          } else {
            clId += url[i];
            i++;
          }
        }
      }
    }
    context.getValid(drId, clId).then(valid => {
      setValid(valid);
      if (valid) {
        start();
      }
    });
  };

  function start() {
    ctx = document.getElementById("myCanvas").getContext("2d");

    $("#myCanvas").mousedown(function(e) {
      mousePressed = true;
      Draw(
        e.pageX - $(this).offset().left,
        e.pageY - $(this).offset().top,
        false
      );
    });

    $("#myCanvas").mousemove(function(e) {
      if (mousePressed) {
        Draw(
          e.pageX - $(this).offset().left,
          e.pageY - $(this).offset().top,
          true
        );
      }
    });

    $("#myCanvas").mouseup(function(e) {
      mousePressed = false;
    });
    $("#myCanvas").mouseleave(function(e) {
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
    lastX = x;
    lastY = y;
  }

  function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  useEffect(() => {
    parseUrl();
  }, []);

  return (
    <section>
      {valid ? (
        <React.Fragment>
          <div className="form-container">
            <canvas id="myCanvas"></canvas>
            <button
              onClick={() => {
                context.sendImage(objToSend);
              }}
            >
              Envoyer
            </button>
          </div>
        </React.Fragment>
      ) : null}
    </section>
  );
};

export default Form;
