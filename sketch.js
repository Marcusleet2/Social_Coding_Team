function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(220, 0, 0);
}

/*
function slider() {
  // Slider
  push();
  noStroke();
  fill(211, 48, 100);
  for (let i = 0; i < 105; i++) {
    circle(80 + i * 2, 633, 6);
  }
  pop();

  // Button
  push();
  noStroke();
  for (let i = 0; i < 2; i++) {
    fill(211, i + i * 100, 100);
    circle(buttonX, 633, 20 - i * 10);
  }
  pop();

  if (dragging) {
    buttonX = constrain(mouseX, 95, 272);
    sliderYear = round(map(buttonX, 95, 272, 0, 43));
  }

*/