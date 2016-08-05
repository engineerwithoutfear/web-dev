// set dimensions 
var canvasHeight = 500;
var canvasWidth = 600;
// set default min, max, average, rectWidth, etc
var theMin = 100;
var theMax = 300;
var theAverage = (theMax + theMin) / 2;
var rectWidths = 100;
var fontSize = 15;
var textOffset = rectWidths / 3;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  // create sliders and set default fontsize
  spawnSliders();
  textSize(fontSize);
}

function draw() {
  clear();
  translate(10, canvasHeight);
  // update values
  updateBars();
  //flip the bars so they grow bottom to top
  scale(1, -1);
  //draw the small fellow
  drawSmall();
  // label the small fellow
  push();
  labelSmall();
  pop();
  offset += rectWidths;
  //draw the average fellow
  drawAverage();
  // label the average fellow
  push();
  labelAverage();
  pop();
  offset += rectWidths;
  //draw the large fellow
  push();
  drawLarge();
  pop();
  // label the large fellow
  push();
  labelLarge();
  pop();
  //label the sliders
  labelSliders();
}

function Bar(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}
// vertical distance between sliders
var interdistanceY = -50;
// horizontal alignment of sliders
var sliderAlignment = canvasWidth / 2 + 50;

//var distFromSlide = sliderAligment;
//var distFromTop = 0;
function spawnSliders() {
  push();
  translate(10, canvasHeight);
  scale(1, -1);
  minSlider = createSlider(0, 450, theMin);

  maxSlider = createSlider(0, 450, theMax);
  maxSlider.position(sliderAlignment + 100, canvasHeight + interdistanceY * 2);
  minSlider.position(sliderAlignment + 100, canvasHeight + interdistanceY * 3);
  pop();

}

function labelSliders() {
  push();
  //de flip so the text isn't upside down
  scale(1, -1);
  fill(rectSmall.color);
  text("min: " + theMin, sliderAlignment, interdistanceY * 3 + 10);
  fill(rectLarge.color);
  text("max: " + theMax, sliderAlignment, interdistanceY * 2 + 10);
  fill(rectAverage.color);
  text("average: (" + theMin + "+" + theMax + ")/2 = " + theAverage, sliderAlignment, interdistanceY + 10);
  pop();
}

function updateBars() {

  offset = 0;
  theMin = minSlider.value();
  theMax = maxSlider.value();

  theAverage = (theMax + theMin) / 2;
  rectSmall = new Bar(rectWidths, theMin, 'blue');
  rectLarge = new Bar(rectWidths, theMax, 'red');
  rectAverage = new Bar(rectWidths, theAverage, 'purple');
}

function drawSmall() {
  fill(rectSmall.color);
  rect(offset, 0, rectSmall.x, rectSmall.y);
}

function labelSmall() {
  push();
  scale(1, -1);
  fill('black');
  text("min", offset + textOffset, -(rectSmall.y + textOffset));
  pop();
}

function labelAverage() {
  push();
  scale(1, -1);
  fill('black');
  rectMode(CENTER);
  text("   (min + max)", offset, -(rectAverage.y + textOffset));
  text("   _________", offset, -(rectAverage.y + textOffset * .8));
  text("            2", offset, -(rectAverage.y + textOffset * .2));
  pop();
}

function drawAverage() {
  fill(rectAverage.color);
  rect(offset, 0, rectAverage.x, rectAverage.y)
}

function drawLarge() {
  fill(rectLarge.color);
  rect(offset, 0, rectLarge.x, rectLarge.y)
}

function labelLarge() {
  push();
  scale(1, -1);
  fill('black');
  text("max", offset + textOffset, -(rectLarge.y + textOffset));
  pop();
}