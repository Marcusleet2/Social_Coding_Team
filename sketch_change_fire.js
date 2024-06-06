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
let hue = 0;

let rectButton;
let circleButton;
let triangleButton;

let mode;

function preload() {
  font = loadFont("font/MerriweatherSans-Regular.ttf");
  volcano = loadImage("assets/volcano.png");
}

function setup() {
  createCanvas(800, 500);
  colorMode(HSB);
  //   rectMode(CENTER);
  textFont(font);
  //   imageMode(CENTER);
  angleMode(DEGREES);

  // Strength of fire
  // setInterval(createFire, 25);

  //Radio
  myRadio = createRadio();
  myRadio.position(270, 200);
  myRadio.size(350);

  myRadio.option("GoldenRod", "Spring");
  myRadio.option("YellowGreen", "Summer");
  myRadio.option("SteelBlue", "Fall");
  myRadio.option("DarkTurquoise", "Winter");

  myRadio.selected("SteelBlue");

  //Fire Button Color
  redFireButton = createButton("Red");
  redFireButton.position(270, 250);
  redFireButton.mousePressed(redFire);

  orangeFireButton = createButton("Orange");
  orangeFireButton.position(320, 250);
  orangeFireButton.mousePressed(orangeFire);

  yellowFireButton = createButton("Yellow");
  yellowFireButton.position(390, 250);
  yellowFireButton.mousePressed(yellowFire);

  greenFireButton = createButton("Green");
  greenFireButton.position(453, 250);
  greenFireButton.mousePressed(greenFire);

  blueFireButton = createButton("Blue");
  blueFireButton.position(270, 280);
  blueFireButton.mousePressed(blueFire);

  purpleFireButton = createButton("Purple");
  purpleFireButton.position(322, 280);
  purpleFireButton.mousePressed(purpleFire);

  pinkFireButton = createButton("Pink");
  pinkFireButton.position(387, 280);
  pinkFireButton.mousePressed(pinkFire);

  // button shapes
  rectButton = createButton("Rectangle");
  rectButton.position(270, 300);
  rectButton.mousePressed(function () {
    mode = "rectangle";
  });

  triangleButton = createButton("triangle");
  triangleButton.position(350, 300);
  triangleButton.mousePressed(function () {
    mode = "triangle";
  });

  circleButton = createButton("circle");
  circleButton.position(420, 300);
  circleButton.mousePressed(function () {
    mode = "circle";
  });
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
  background(211, 100, 45);

  // Radio
  let g = myRadio.value();
  background(g);

  createFire();

  // Creating Fire
  for (let i = fire.length - 1; i >= 0; i--) {
    fire[i].show();
    fire[i].update();

    // Change Fire Color
    let boundry = 200 < mouseX && mouseX < 600 && 50 < mouseY && mouseY < 130;
    if (boundry) {
      fire[i].multicolor();
    }

    // Deleting fire
    if (fire[i].y < 55) {
      fire.splice(i, 1);
    }
  }

  image(volcano, -10, 10, 800, 700);

  coIn();

  //background color text
  text("Background Color", 133, 213);

  //fire color
  text("Fire Color", 133, 250);

  // shape
  text("shape change", 133, 315);
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
    this.multi = random([h + 50, h + 150, h + 250, h + 350]);
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
      this.size -= 0.27;
    } else {
      this.size = 0;
    }
  }

  multicolor() {
    push();
    noStroke();
    fill(this.multi, 100, 100);
    translate(this.x, this.y);
    rotate((this.angle * PI) / 180);
    // triangle(0, -this.size, this.size * 1.8, 0, 0, this.size);
    pop();
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

function createFire() {
  for (let i = 0; i < 4; i++) {
    let f = new Fire(
      random(225, 560),
      128,
      random(5, 20),
      random(-300, 300),
      random(hue + 10, hue + 20)
    );
    fire.push(f);
  }
}

function coIn() {
  text(mouseX + "," + mouseY, 20, 20);
}

function redFire() {
  hue = 0;
}

function orangeFire() {
  hue = 27;
}

function yellowFire() {
  hue = 58;
}

function greenFire() {
  hue = 121;
}

function blueFire() {
  hue = 185;
}

function purpleFire() {
  hue = 260;
}

function pinkFire() {
  hue = 305;
}
