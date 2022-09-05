var factor = 50;
var speed = 5;
function setup() {
  createCanvas(windowWidth, windowHeight);
  xpos = random(0,width-factor);
  ypos = random(0,height-factor);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  
  if (frameCount % speed == 0) {
    xpos += random(-factor,factor);
    ypos += random(-factor,factor);
    
    if (xpos > width || xpos < 0)  { xpos = random(0,width); }
    if (ypos > height || ypos < 0) { ypos = random(0,height);}
  }
  point(xpos,ypos)
}