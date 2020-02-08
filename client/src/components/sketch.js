export default function sketch(p) {
  p.setup = () => {
    p.createCanvas(244, 244, p.WEBGL);
  };
  p.draw = () => {
    p.strokeWeight(2);
    p.stroke("red");
    p.fill(0);
    p.background(255);
  };
}
