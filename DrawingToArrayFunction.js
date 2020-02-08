
//using p5js 

function setup() {
  createCanvas(256, 256);
  
  strokeWeight(5);
  stroke('red');
  fill(0);
  background(255);
  
}

function draw() {
  
  frameRate(50);
  
  line(mouseX, mouseY, pmouseX, pmouseY);
  point(mouseX, mouseY);
  if (mouseIsPressed == true) {
    stroke('black');
    let x=mouseX;
    let y=mouseY;
    point(x, y);
    fill(220); // White
  } 
  
  else {
    stroke('white');
    fill(0)
  }
   
  if (mouseButton == RIGHT) {
    //let img=createImage(256,256); 
    //img.loadPixels();
    let p = get();
    p.loadPixels();
    console.log(p.pixels); 

  } 
  //text("X: "+mouseX, 0, height/4);
  //text("Y: "+mouseY, 0, height/2);
}