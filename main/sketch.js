//variables ------------------------------------------------------
var scene = 0;

var fr; //FPS


var pet;
var petname = '';
var homebutton;
var pacifico;

var coins = 0;

var playbutton;

var patcount = 0;

var petting = false;

var bathtub;
var food;
var bed;
var custom;

//preload --------------------------------------------------------
function preload() {
  
  //font family pacifico
  pacifico = loadFont('assets/Pacifico-Regular.ttf');
  
}

//setup -----------------------------------------------------------
function setup() {
  createCanvas(1000, 700);
  
  coins = 0;
  
  fr = 1; //starting FPS
  frameRate(fr); //refresh to starting FPS
  
  textAlign(CENTER, CENTER);
  textFont(pacifico);
  
  
  pet = createSprite(width/2, height/2);
  //create an animation
  pet.addAnimation('assets/box0001.png','assets/box0002.png','assets/box0003.png');
  
  pet.onMousePressed = function (){  // petting the blobby will give the blobby affection and every 10 good pets will award 5 coins
    patcount += 1;
    console.log(patcount);
    
    if (patcount > 0 && patcount % 10 == 0) {
      coins += 5;
      console.log(coins);
    }
  }
  
  //buttons for events
  playbutton = createImg('/assets/play.png');

  homebutton = createImg('assets/home_btn.png');
  
  bathtub = createImg('assets/Bathtub.png');
  food = createImg('assets/food.png');
  bed = createImg('assets/bed.png');
  custom = createImg('assets/art.png');
  
}



//draw ------------------------------------------------------------
function draw() {
      
  background(189,255,234);
  playbutton.hide();
  bathtub.hide();
  food.hide();
  bed.hide();
  custom.hide();
  homebutton.hide();

  if (scene ==0) {           //title screen 
    playbutton.show();

    var r = 7;
    var g = 144;
    var b = 162;

    textSize(100);
    
    for(var i = 0; i<100; i++) {
      r += random(-5,5);
      g += random(-5,5);
      b += random(-5,5);
      fill(r,g,b);
    }
    
    text('blobby',500,250);
    
    textSize(30);
    fill (0,0,0);
    text('your',500,180);
    
    
    //play button to start game
    playbutton.position(430,350);    
    playbutton.mousePressed(switchToScene1);

    
  }else if (scene == 1){       //user input pet name    
    line(200,350,800,350);
    
    textSize(30);
    text('give your blobby a name',400,180);
    textSize(50);
    text(petname, 500,300);
    
  }else if (scene == 2) {           // main game screen
    bathtub.show();
    food.show();
    bed.show();
    custom.show();
    
    fr = 30;
    frameRate(fr);
    drawSprite(pet);
    textSize(15);
    text(petname,pet.position.x,pet.position.y-80);
    
    //draw bathtub
    bathtub.position(50,50);
    bathtub.mousePressed(switchBathEvent);
    
    //draw food
    food.position(50,500);
    food.mousePressed(switchMealEvent);

    
    //draw bed
    bed.position(750,50);
    bed.mousePressed(switchSleepEvent);

    
    //draw customization
    custom.position(750,500);
    custom.mousePressed(switchCustomizations);
    
    text("coins = " + str(coins), width - 50, 50);
    
  } else if (scene == 3) {             //BATHTUB EVENT
    homebutton.show();
    homebutton.position(50,50);
    homebutton.mousePressed(switchHome);
    drawSprite(pet);
  } else if (scene == 4) {             //MEAL EVENT
    homebutton.show();
    homebutton.position(50,50);
    homebutton.mousePressed(switchHome);
    drawSprite(pet);
  } else if (scene == 5) {             //SLEEP EVENT
    homebutton.show();
    homebutton.position(50,50);
    homebutton.mousePressed(switchHome);
    drawSprite(pet);
  } else if (scene == 6) {             //CUSTOMIZATIONS
    homebutton.show();
    homebutton.position(50,50);
    homebutton.mousePressed(switchHome);
    drawSprite(pet);
  }

}


function keyPressed() {
  if (scene == 1) {
    if (petname.length > 3 && keyCode === ENTER) {
      scene = 2;
    } else if (petname.length < 3 && keyCode === ENTER){
      text("that name is too short!",430,550);      
    } else if (petname.length > 20) {
      text("that name is too long!",430,550);
      return false;
    } else if (keyCode === BACKSPACE){
      petname = petname.substring(0, petname.length - 1);      
      // erasing the text doesn't work, maybe because the original petname is already printed
    } else if (keyCode > 64 && keyCode < 91 || keyCode > 96 && keyCode < 123){
      petname += key;
    } else {
      text("that is not a letter!",430,500);
    }
  } /*else if (scene == 2) {
    if (key == "a") {
      pet.position.x += -20;
    } else if (key == "d") {
      pet.position.x += 20;
    } else if (key == "s") {
      pet.position.y += 20;
    } else if (key == "w") {
      pet.position.y += -20;
    }
  }
  */
}

//switches

function switchToScene1() {
  scene = 1;
}

function switchHome() {
  scene = 2;
}

function switchBathEvent() {
  scene = 3;
}

function switchMealEvent() {
  scene = 4;
}

function switchSleepEvent() {
  scene = 5;
}

function switchCustomizations() {
  scene = 6;
}