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
let numberSlider;
let mode;

function preload() {
  font = loadFont("font/MerriweatherSans-Regular.ttf");
  volcano = loadImage("assets/volcano.png");
}

function setup() {
  createCanvas(800, 500);
  colorMode(HSB);
  //   rectMode(CENTER);
  textFont(font,15);
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
  redFireButton.position(270, 230);
  redFireButton.mousePressed(redFire);
  redFireButton.class('button redFireButton');


  orangeFireButton = createButton("Orange");
  orangeFireButton.position(330, 230);
  orangeFireButton.mousePressed(orangeFire);
  orangeFireButton.class('button orangeFireButton')

  yellowFireButton = createButton("Yellow");
  yellowFireButton.position(410, 230);
  yellowFireButton.mousePressed(yellowFire);
  yellowFireButton.class('button yellowFireButton');

  greenFireButton = createButton("Green");
  greenFireButton.position(480, 230);
  greenFireButton.mousePressed(greenFire);
  greenFireButton.class('button greenFireButton');

  blueFireButton = createButton("Blue");
  blueFireButton.position(270, 280);
  blueFireButton.mousePressed(blueFire);
  blueFireButton.class('button blueFireButton');

  purpleFireButton = createButton("Purple");
  purpleFireButton.position(322, 280);
  purpleFireButton.mousePressed(purpleFire);
  purpleFireButton.class('button purpleFireButton');

  pinkFireButton = createButton("Pink");
  pinkFireButton.position(387, 280);
  pinkFireButton.mousePressed(pinkFire);
  pinkFireButton.class('button pinkFireButton');


numberSlider= createSlider(0,1,0.5,0);
numberSlider.size(300);
numberSlider.position(280,405)


  // button shapes
  rectButton = createButton("Rectangle");
  rectButton.position(270,340);
  rectButton.mousePressed(function () {
    mode = "rectangle";
    buttonUpdate();

  });
  rectButton.class('button shapeButton');

  triangleButton = createButton("triangle");
  triangleButton.position(360,340);
  
  triangleButton.mousePressed(function () {
    mode = "triangle";
    buttonUpdate();
  });
  triangleButton.class('shapeButton button')

  circleButton = createButton("circle");
  circleButton.position(430,340);
  circleButton.mousePressed(function () {
    mode = "circle";
    buttonUpdate();
  });
  circleButton.class('shapeButton button');

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
// frameRate(1);

// frameRate(60)
// if(frameCount%1===0){
//   createFire(hue,numberSlider.value());
// }
 



  let fireNumber=numberSlider.value();
  createFire(hue,fireNumber);

  console.log(fireNumber*60)
  

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




  fill('white')
  text("Background Color", 133, 213);

  //fire color
  text("Fire Color", 133, 260);

  // shape
  text("Shape Change", 133,370);

  text("Fireball Numbers", 133,420);

  fill('black');

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

  shapeChange(){
    if(mode==='triangle'){
      triangle(0, -this.size, this.size * 1.8, 0, 0, this.size);
    }else if(mode==='rectangle'){
      rect(0,0,this.size,this.size);
    }else if(mode==='circle'){
      ellipse(0,0,this.size,this.size);
    }else{
      triangle(0, -this.size, this.size * 1.8, 0, 0, this.size);
    }
  }

  
}

// loop fireNumber length  the number of fireballs. 
// Generate 1*fireNumber*60times/second:

function createFire(color,fireNumber) {

  for (let i = 0; i < 3*fireNumber; i++) {
    let f = new Fire(
      random(225, 560),
      128,
      random(5, 20),
      random(-300, 300),
      random(color + 10, color + 20)


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
  hue = 27;
  buttonUpdate()
}

function yellowFire() {
  hue = 58;
  buttonUpdate()
}

function greenFire() {
  hue = 121;
  buttonUpdate()
}

function blueFire() {
  hue = 185;
  buttonUpdate()
}

function purpleFire() {
  hue = 260;
  buttonUpdate()
}

function pinkFire() {
  hue = 305;
  buttonUpdate()
}



function buttonUpdate(){
  // shape buttons if not clicked
  rectButton.removeClass('active');
  triangleButton.removeClass('active');
  circleButton.removeClass('active');


// shape buttons if clicked
  if(mode==='rectangle'){
    rectButton.addClass('active')
  }else if(mode==='triangle'){
    triangleButton.addClass('active')
  }else if(mode==='circle'){
    circleButton.addClass('active');
  }


// color buttons if not clicked
  redFireButton.removeClass('active');
  orangeFireButton.removeClass('active');
  yellowFireButton.removeClass('active');
  greenFireButton.removeClass('active');
  blueFireButton.removeClass('active')
  purpleFireButton.removeClass('active');
  pinkFireButton.removeClass('active')


  // color buttons if clicked
  if(hue==0){
    redFireButton.addClass('active');
  }else if(hue==27){
    orangeFireButton.addClass('active');
  }else if(hue==58){
    yellowFireButton.addClass('active')
  }else if(hue==121){
    greenFireButton.addClass('active');
  }else if(hue==185){
    blueFireButton.addClass('active');
  }else if(hue==260){
    purpleFireButton.addClass('active');
  }else if(hue==305){
    pinkFireButton.addClass('active')
  }


}