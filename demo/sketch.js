//chaos

class Blobs {
  constructor(){ //give attributes initial values
    this.xPos = mouseX+50;
    this.yPos = random(height);
    this.r = random(0);
    this.g = random(255);
    this.b = random(255);
    this.alpha = random(1,255);
    this.speed = 0.1;
    this.size = random(10,100);
    this.rate = 20;
  }
  
  displaySelf(){
    fill(this.r,this.g,this.b,this.alpha);
    ellipse(this.xPos, this.yPos, this.size);
  }
  
  move(){
    this.yPos = (this.yPos + mouseY/this.rate) % height;
    //this.yPos = (this.yPos + this.size/10) % height; 
  }
  
  isClicked(){ //following mouse in x direction
    if(mouseIsPressed){
      this.r = 42;
      this.g = 44;
      this.b = 87;
      this.xPos = (this.xPos - mouseX/this.rate) % height;
      this.speed = 2;
      this.alpha = random(255);
    }
  }
  
  isKeyPressed(){
    if(keyIsPressed){
      this.yPos = 250;
      this.xPos = 250;
      this.size = this.size + 2;
      this.r = 144;
      this.g = 199;
      this.b = 140;
      this.alpha= random(255);
    }
  }
  
  checkCollision(){
    if ((220 < this.xPos < 270) && (220 < this.yPos < 270)){
      console.log("bumped");
    }
  }
  
}

let theBlobs = [];

var points = []
var rate = 0.1;

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  for(let i=0; i<100; i++) {
    theBlobs.push(new Blobs());
  }
  
  //linesss
  angleMode(DEGREES);
  noiseDetail(2);

  
  r1 = random(255);
  r2 = random(255);
  
  g1 = random(100);
  g2 = random(100);
  
  b1 = random(0);
  b2 = random(0);
  
  rate = random(0.005,0,011);
}

function draw() {
  background(255,15);
  fill(0);
  square(220,220, 50, 0);
  for(let i=0; i<100; i++) {
    theBlobs[i].displaySelf();
    theBlobs[i].move();
    theBlobs[i].isClicked();
    theBlobs[i].isKeyPressed();
    theBlobs[i].checkCollision();
  }
  
  // jiggly lineesss
    for(var i=0; i < points.length; i++) {
    
      var r = map(points[i].x,0,width,r1,r2);
      var g = map(points[i].y,0,height,g1,g2);
      var b = map(points[i].x,0,width,b1,b2);

      fill(r,g,b);

      var way = random(0,100);

      var angle = map(noise(points[i].x, points[i].y*rate/2  ),2,1,4, way);

      points[i].add(createVector(cos(angle),sin(angle)));

      ellipse(points[i].x, points[i].y,4);
    }
  
    var density = 2; //       num of points in a row
    var space = width / density;
  
    for (var x=0; x < width; x += space){
    for (var y = 0; y < height; y += space) {
      var p = createVector(x + random(-100,100),y + random (-100,200));
      points.push(p);
    }
  }
}