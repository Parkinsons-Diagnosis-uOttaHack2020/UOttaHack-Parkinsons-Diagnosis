import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import "./Form.css";
import $ from "jquery";

const Form = props => {
  const context = useContext(Context);
  const [valid, setValid] = useState(null);
  const [ids, setIds] = useState(null);

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
      setIds({
          drId: drId,
          clId: clId
      })
    });
  };

  let ctx;
  let mousePressed = false;
  let lastX, lastY;
  let objToSend = {
    img: "test"
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
      if (!isDown) {
        ctx.moveTo(x, y);
      }
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

  function getPixels() {
    // Get the CanvasPixelArray from the given coordinates and dimensions.
    var imgd = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var pix = imgd.data;
    // console.log(pix);

    var result = [];
    var max = 0;
    for (let i = 0; i < pix.length; i += 4) {
      let element = pix[i + 3];
      if (pix[i + 3] == 255) {
        max++;
      }
      result.push(element);
    }
    // console.log(max);
    return result;
    // // Loop over each pixel and invert the color.
    // for (var i = 0, n = pix.length; i < n; i += 4) {
    //     pix[i  ] = 255 - pix[i  ]; // red
    //     pix[i+1] = 255 - pix[i+1]; // green
    //     pix[i+2] = 255 - pix[i+2]; // blue
    //     // i+3 is alpha (the fourth element)
    // }
  }

  useEffect(() => {
    if (valid === null) {
      parseUrl();
    } else if (valid) {
      start();
    }
  }, [valid]);

  return (
    <section>
      {valid ? (
        <React.Fragment>
          <div className="form-container">
            <div className="instructions">
              <div className="top">
                <h1>Instructions</h1>
                <span className="inst-txt">
                  In the blank canvas on the right, try your best to draw a
                  spiral like the example pictured below. Click{" "}
                  <b>SUBMIT</b> once your are done, or <b>CLEAR</b> to try
                  again.
                </span>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Archimedean_spiral.svg/1200px-Archimedean_spiral.svg.png" />
            </div>
            <div className="draw">
              <div>
                <div className="canvasWrapper">
                  <canvas id="myCanvas" width="400" height="400"></canvas>
                </div>
                <div className="form-btns-container">
                  <button
                    className="btn form-btns"
                    onClick={() => {
                      context.sendImage(
                        getPixels(),
                        ctx.canvas.width,
                        ctx.canvas.height,
                        ids
                      );
                      clearArea();
                    }}
                  >
                    Submit
                  </button>
                  <button
                    className="btn form-btns"
                    onClick={() => {
                      clearArea();
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </section>
  );
};

export default Form;
