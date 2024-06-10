let font;
let fire = [];
let myRadio;
let g;
let cColor = false;
let volcano;
let redFireButton,
  orangeFireButton,
  yellowFireButton,
  greenFireButton,
  blueFireButton,
  purpleFireButton,
  pinkFireButton;
let hue = 25;

let rectButton;
let circleButton;
let triangleButton;
let numberSlider;
let mode;
let scroll;

function preload() {
  font = loadFont("font/MerriweatherSans-Regular.ttf");
  volcano = loadImage("assets/volcano_v2.png");
  scroll = loadImage("assets/scroll.png");
}

function setup() {
  createCanvas(800, 500);
  colorMode(HSB);
  //   rectMode(CENTER);
  textFont(font, 15);
  //   imageMode(CENTER);
  angleMode(DEGREES);

  // Strength of fire
  // setInterval(createFire, 25);

  //Radio
  myRadio = createRadio();
  myRadio.position(515, 140);
  myRadio.size(350);

  myRadio.option(116, "Spring");
  myRadio.option(207, "Summer");
  myRadio.option(32, "Fall");
  myRadio.option(232, "Winter");

  myRadio.selected("207");

  //Fire Button Color
  redFireButton = createButton("Red");
  redFireButton.position(511, 190);
  redFireButton.mousePressed(redFire);
  redFireButton.class("button redFireButton");

  orangeFireButton = createButton("Orange");
  orangeFireButton.position(565, 190);
  orangeFireButton.mousePressed(orangeFire);
  orangeFireButton.class("button orangeFireButton");

  yellowFireButton = createButton("Yellow");
  yellowFireButton.position(638, 190);
  yellowFireButton.mousePressed(yellowFire);
  yellowFireButton.class("button yellowFireButton");

  greenFireButton = createButton("Green");
  greenFireButton.position(705, 190);
  greenFireButton.mousePressed(greenFire);
  greenFireButton.class("button greenFireButton");

  blueFireButton = createButton("Blue");
  blueFireButton.position(556, 235);
  blueFireButton.mousePressed(blueFire);
  blueFireButton.class("button blueFireButton");

  purpleFireButton = createButton("Purple");
  purpleFireButton.position(610, 235);
  purpleFireButton.mousePressed(purpleFire);
  purpleFireButton.class("button purpleFireButton");

  pinkFireButton = createButton("Pink");
  pinkFireButton.position(680, 235);
  pinkFireButton.mousePressed(pinkFire);
  pinkFireButton.class("button pinkFireButton");

  numberSlider = createSlider(0, 1.3, 0.5, 0);
  numberSlider.size(220);
  numberSlider.position(535, 400);

  // button shapes
  rectButton = createButton("Magic");
  rectButton.position(540, 310);
  rectButton.mousePressed(function () {
    mode = "rectangle";
    buttonUpdate();
  });
  rectButton.class("button shapeButton");

  triangleButton = createButton("Fire");
  triangleButton.position(615, 310);

  triangleButton.mousePressed(function () {
    mode = "triangle";
    buttonUpdate();
  });
  triangleButton.class("shapeButton button");

  circleButton = createButton("Bubble");
  circleButton.position(680, 310);
  circleButton.mousePressed(function () {
    mode = "circle";
    buttonUpdate();
  });
  circleButton.class("shapeButton button");
}

// function mousePressed() {
//     let boundry = 200 < mouseX && mouseX < 600 && 50 < mouseY && mouseY < 130
//     if (boundry) {

//         cColor = fire[i].multicolor();

//         if (cColor) {
//             cColor = true;
//         }else{
//         cColor = false;
//         }
//     }
// }

function draw() {
  // Radio
  let g = myRadio.value();
  background(g, 77, 70);

  //Gradiant background
  push();
  rectMode(CENTER);
  noStroke();
  for (let i = 0; i < 130; i++) {
    fill(g, 90 - i * 0.6, 80);
    rect(width / 2, 4 + i * 4, width, 8);
  }
  pop();

  // frameRate(1);

  // frameRate(60)
  // if(frameCount%1===0){
  //   createFire(hue,numberSlider.value());
  // }

  //volcano
  image(volcano, -5, 0);

  let fireNumber = numberSlider.value();
  createFire(hue, fireNumber);

  console.log(fireNumber * 60);

  // Creating Fire
  for (let i = fire.length - 1; i >= 0; i--) {
    fire[i].show();
    fire[i].update();

    // Change Fire Color
    let boundry = 120 < mouseX && mouseX < 400 && 140 < mouseY && mouseY < 249;
    if (boundry) {
      fire[i].multicolor();
    }

    // Deleting fire
    if (fire[i].y < 55) {
      fire.splice(i, 1);
    }
  }

  //scroll
  push();
  image(scroll, 465, 20, 360, 460);
  pop();

  fill("black");

  //Magic volcano
  push();
  fill(274, 86, 100);
  textSize(25);
  text("Magic Volcano", 565, 96);
  pop();

  push();
  fill(242, 100, 100);
  //background color text
  text("Background Color", 520, 130);

  //Particle color
  text("Particle Color", 520, 185);

  // shape
  text("Type", 520, 305);

  text("Particle Amount", 520, 389);
  pop();

  // coIn();
}

// function GWSign(x, y, size) {
//   noStroke();
//   fill(31, 100, 100);
//   for (let i = 0; i < 28; i++) {
//     circle(x + i * 10, y, size + 35);
//   }

//   fill(51, 100, 100);
//   for (let i = 0; i < 28; i++) {
//     circle(x + i * 10, y, size);
//   }
// }

// function customTexts(word, size, x, y, h, s, b, a) {
//   push();
//   textAlign(a, CENTER);
//   noStroke();
//   fill(26, 187, 80); //(h, s, b);
//   textSize(size);
//   text(word, x, y);
//   pop();
// }

class Fire {
  constructor(x, y, size, rotation, h) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.size = size;
    this.rotation = rotation;
    this.h = h; //+50, +150, +250
    this.originalH = h;
    this.colored = false;
  }

  show() {
    push();
    noStroke();
    fill(this.h, 100, 100);
    translate(this.x, this.y);
    rotate((this.angle * PI) / 180);
    // triangle(0, -this.size, this.size * 1.8, 0, 0, this.size);
    this.shapeChange();
    pop();
  }

  update() {
    this.y -= 1.5;
    this.angle += this.rotation;
    if (this.size > 0) {
      this.size -= 0.15;
    } else {
      this.size = 0;
    }
  }

  multicolor() {
    if (!this.colored) {
      this.h = random(0, 360);
      this.colored = true;
    }
  }

  shapeChange() {
    if (mode === "triangle") {
      triangle(0, -this.size, this.size * 1.8, 0, 0, this.size);
    } else if (mode === "rectangle") {
      rect(0, 0, this.size, this.size);
    } else if (mode === "circle") {
      ellipse(0, 0, this.size, this.size);
    } else {
      triangle(0, -this.size, this.size * 1.8, 0, 0, this.size);
    }
  }
}

// loop fireNumber length  the number of fireballs.
// Generate 1*fireNumber*60times/second:

function createFire(color, fireNumber) {
  for (let i = 0; i < 3 * fireNumber; i++) {
    let f = new Fire(
      random(116, 380),
      235,
      random(5, 20),
      random(-300, 300),
      random(color - 20, color + 15)
    );
    fire.push(f);
  }
}

function coIn() {
  text(mouseX + "," + mouseY, 20, 20);
}

function redFire() {
  hue = 0;
  buttonUpdate();
}

function orangeFire() {
  hue = 25;
  buttonUpdate();
}

function yellowFire() {
  hue = 50;
  buttonUpdate();
}

function greenFire() {
  hue = 82;
  buttonUpdate();
}

function blueFire() {
  hue = 207;
  buttonUpdate();
}

function purpleFire() {
  hue = 278;
  buttonUpdate();
}

function pinkFire() {
  hue = 317;
  buttonUpdate();
}

function buttonUpdate() {
  // shape buttons if not clicked
  rectButton.removeClass("active");
  triangleButton.removeClass("active");
  circleButton.removeClass("active");

  // shape buttons if clicked
  if (mode === "rectangle") {
    rectButton.addClass("active");
  } else if (mode === "triangle") {
    triangleButton.addClass("active");
  } else if (mode === "circle") {
    circleButton.addClass("active");
  }

  // color buttons if not clicked
  redFireButton.removeClass("active");
  orangeFireButton.removeClass("active");
  yellowFireButton.removeClass("active");
  greenFireButton.removeClass("active");
  blueFireButton.removeClass("active");
  purpleFireButton.removeClass("active");
  pinkFireButton.removeClass("active");

  // color buttons if clicked
  if (hue == 0) {
    redFireButton.addClass("active");
  } else if (hue == 25) {
    orangeFireButton.addClass("active");
  } else if (hue == 50) {
    yellowFireButton.addClass("active");
  } else if (hue == 82) {
    greenFireButton.addClass("active");
  } else if (hue == 207) {
    blueFireButton.addClass("active");
  } else if (hue == 278) {
    purpleFireButton.addClass("active");
  } else if (hue == 317) {
    pinkFireButton.addClass("active");
  }
}
