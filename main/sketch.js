//variables ------------------------------------------------------
var scene = 0 // the different game screens
var fr; //FPS


var pet;
var petname = '';

var homebutton;
var pacifico; //font family

var affection = 0;
var patcount = 0;
var petting = false;

var playbutton;
var bathtub;
var food;
var bed;
var custom;

var lampState;

var onlamp;
var offlamp;

var mealTimer;

// customizeeee
var leaf;
var daisy;
var baby;
var halo;
var scarf;


//switches for hats

var leafon;
var daisyon;
var babyon;
var haloon;
var scarfon;

var triangleRice;

//classes ------------------------------------------------------


class bHeart {  
  //these are the affection hearts that pop up when petting blobby
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  display() {
    fill(255,0,0);
    noStroke();
    beginShape();
    bezier(this.x,this.y,this.x-30,this.y-20,this.x-20,this.y-70,this.x,this.y-35);
    bezier(this.x,this.y,this.x+30,this.y-20,this.x+20,this.y-70,this.x,this.y-35);
    endShape();
  }
  
}

//preload --------------------------------------------------------
function preload() {
  
  //pacifico = loadFont('Pacifico-Regular.ttf');
  pacifico = loadFont('assets/Pacifico-Regular.ttf');
  
}

//setup -----------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //this is your affection count w blobby
  affection = 0;
  
  fr = 1; //initial fps
  frameRate(fr);

  //text general settings
  textAlign(CENTER, CENTER);
  textFont(pacifico);
  
  //this is the blobby sprite <3
  pet = createSprite(windowWidth/2, windowHeight/2);
	
  //blobby animation
	
  pet.addAnimation('b_normal','assets/blue/normal1.png','assets/blue/normal2.png','assets/blue/normal3.png');
  pet.addAnimation('b_loved','assets/blue/loved1.png','assets/blue/loved2.png','assets/blue/loved3.png');
  pet.addAnimation('b_snacky','assets/blue/snacky1.png','assets/blue/snacky2.png','assets/blue/snacky3.png');
  pet.addAnimation('sleeping','assets/blue/sleeping1.png','assets/blue/sleeping2.png','assets/blue/sleeping3.png');
	
	
  /*
  pet.addAnimation('b_normal','normal1.png','normal2.png','normal3.png');
  pet.addAnimation('b_loved','loved1.png','loved2.png','loved3.png');
  pet.addAnimation('b_snacky','snacky1.png','snacky2.png','snacky3.png');
  pet.addAnimation('sleeping','sleeping1.png','sleeping2.png','sleeping3.png');
  */


  // petting the blobby will give affection
  pet.onMousePressed = function (){
    pet.changeAnimation('b_loved');
    patcount += 1;
    petting = true;
    blobbyHearts = new bHeart(pet.position.x + (random -100,100),pet.position.y+ (random(-60,60))); 
    console.log(patcount);
		
	//every 5 good pets will award 1 affection point
    if (patcount > 0 && patcount % 5 == 0) {
      affection += 1;
      console.log(affection);
    }
  }
  
  //create  image buttons for event
  
/*
  playbutton = createImg('play.png');
  homebutton = createImg('home_btn.png');
  bathtub = createImg('Bathtub.png');
  food = createImg('food.png');
  bed = createImg('bed.png');
  custom = createImg('art.png');
  onlamp = createImg('onlamp.png');
  offlamp = createImg('offlamp.png');
  leaf = createImg('leaf.png');
  daisy = createImg('daisy.png');
  baby = createImg('babyblob.png');
  halo = createIImg('halo.png');
  scarf = createImg('scarf.png');
  triangleRice = createImg('trianglerice.png');
  */
  
  playbutton = createImg('assets/play.png');
  homebutton = createImg('assets/home_btn.png');
  bathtub = createImg('assets/Bathtub.png');
  food = createImg('assets/food.png');
  bed = createImg('assets/bed.png');
  custom = createImg('assets/art.png');
  onlamp = createImg('assets/onlamp.png');
  offlamp = createImg('assets/offlamp.png');
  triangleRice = createImg('assets/trianglerice.png');
  leaf = createImg('assets/leaf.png');
  daisy = createImg('assets/daisy.png');
  baby = createImg('assets/babyblob.png');
  halo = createImg('assets/halo.png');
  scarf = createImg('assets/scarf.png');
  
  lampState = true;
}



//draw ------------------------------------------------------------
function draw() {
  resizeCanvas(windowWidth, windowHeight);
  background(189,255,234);
  
  //make sure the buttons are hidden at first (I want to show them only in specific scenes)
  playbutton.hide();
  bathtub.hide();
  food.hide();
  bed.hide();
  custom.hide();
  homebutton.hide();
  
  onlamp.hide();
  offlamp.hide();
  
  leaf.hide();
  daisy.hide();
  baby.hide();
  halo.hide();
  scarf.hide();
  
  triangleRice.hide();
  

  if (scene ==0) {       //title screen
    playbutton.show();

    //making variables to randomize the color of the game title
    var r = 7;
    var g = 144;
    var b = 162;

    textSize(100);
    
    //continuously changing the color of the BLOBBY title
    //framerate is set to 1, so it's a very slow animation
    for(var i = 0; i<100; i++) {
      r += random(-5,5);
      g += random(-5,5);
      b += random(-5,5);
      fill(r,g,b);
    }
    
    // game title
    text('blobby',windowWidth/2,250);
    
    
    // readjusting the text properties so only the game title is changing colors
    textSize(30);
    fill (0,0,0); 
    text('your',windowWidth/2,180);
    
    
    //press the play button to start game
    playbutton.position(windowWidth/2-100,windowHeight/2); 
    playbutton.mousePressed(switchToScene1);

    
  }else if (scene == 1){       //user input pet name    
    //this is the line where you write the new name
	line(100,windowHeight/2 +50,windowWidth-100,windowHeight/2 +50);
    
    //instructions
    textSize(30);
    text('give your blobby a name',windowWidth/2-100,180);
    
	//this is your blobby's new name!
    textSize(50);
    text(petname, windowWidth/2,windowHeight/2);
    
  }else if (scene == 2) {       // main game screen
    
	//show the hidden buttons
	bathtub.show();
    food.show();
    bed.show();
    custom.show();
    
    
	//adjusting framerate
    fr = 30;
    frameRate(fr);
		
	//drawing your blobby and its new name!
	pet.position.x = windowWidth/2;
	pet.position.y = windowHeight/2; // making sure pet stays in center of window
    pet.scale =1;
    pet.changeAnimation('b_normal');
    drawSprite(pet);
    
    textSize(20);
    text(petname,pet.position.x,pet.position.y-80);
    
    //draw bathtub button
    bathtub.position(50,50);
    bathtub.mousePressed(switchBathEvent);
    
    //draw food button
    food.position(50,windowHeight-200);
    food.mousePressed(switchMealEvent);

    
    //draw bed button
    bed.position(windowWidth-200,50);
    bed.mousePressed(switchSleepEvent);

    
    //draw customization button
    custom.position(windowWidth-200,windowHeight-200);
    custom.mousePressed(switchCustomizations);
    
    if (windowWidth > 600) {
        text("affection = " + str(affection), windowWidth/2, 50);
    } else {
        text("affection = " + str(affection), 50, windowHeight/2);
    }

    if (petting) {
      blobbyHearts.display();
      textSize(15);
      petting = false;
    }
  

    if (patcount > 0 && patcount % 5 == 0) {
      text("+1", pet.position.x, pet.position.y-120);
      pet.changeAnimation('b_loved');
      drawSprite(pet);
    }
    
  } else if (scene == 3) {             //BATHTUB EVENT
    homebutton.show();
    homebutton.position(50,50);
    homebutton.mousePressed(switchHome);
    pet.scale =1;
    drawSprite(pet);
    fr = 30;
    frameRate(fr);
		
		
  } else if (scene == 4) {             //MEAL EVENT
    homebutton.show();
    homebutton.position(50,50);
    homebutton.mousePressed(switchHome);
    
    fr = 30;
    frameRate(fr);
    
    triangleRice.position(100,windowHeight/2);
    triangleRice.show();
    triangleRice.mousePressed(foodSpinnies);
    
    fill(90,90,90);
    rect (0,windowHeight-80,windowWidth,80);
    
    pet.position.x = windowWidth/2;
    pet.position.y = windowHeight - 100;
    pet.scale = 0.5;
    drawSprite(pet);
    

    //movement with mouse - https://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite3.js
    
    if (mouseX < pet.position.x - 20) {
      pet.mirrorX(1);
    } else if (mouseX > pet.position.x + 20) {
      pet.mirrorX(-1);
    }
    
		
  } else if (scene == 5) {             //SLEEP EVENT
    
    homebutton.show();
    homebutton.position(50,50);
    homebutton.mousePressed(switchHome);
    pet.scale =1;
    drawSprite(pet);
    
    if (lampState) {
      fr = 30;
      frameRate(fr);
      onlamp.show();
      onlamp.position(100,windowHeight/2);
      onlamp.mousePressed(lightSwitch);
      pet.changeAnimation('b_normal');
      drawSprite(pet);
    } else {
      offlamp.show();
      offlamp.position(100,windowHeight/2);
      offlamp.mousePressed(lightSwitch);
      pet.changeAnimation('sleeping');
      drawSprite(pet);
      
      fr = 3;
      frameRate(fr);
    
      textSize(15);
      text("zzz",pet.position.x + 100,pet.position.y);
      fill('rgba(0, 0, 0, 0.68)');
      rect(0,0,windowWidth,windowHeight);
    }
    
    
    
  } else if (scene == 6) {             //CUSTOMIZATIONS
    
    homebutton.show();
    homebutton.position(50,50);
    homebutton.mousePressed(switchHome);
    drawSprite(pet);
    
    leaf.position(windowWidth-250,50);
    leaf.show();
    
    daisy.position(windowWidth-250,150);
    daisy.show();
    daisy.mousePressed(wearDaisy);
    
    if (daisyon) {
      daisy.position(pet.position.x-100,pet.position.y-100);
      text("Yes! That one!", pet.position.x-200, pet.position.y-100);
    }

    baby.position(windowWidth-250,250);
    baby.show();

    halo.position(windowWidth-250,300);
    halo.show()
    
    scarf.position(windowWidth-250,350);
    scarf.show()
    
  }

}


function keyPressed() {
  
  if (scene == 1) {    //only happens when you are giving your blobby a name!
	textSize(20);
     
    // you picked a good name! <3
    
    if (petname.length > 3 && keyCode === ENTER) {
      scene = 2;
    } 
    
    // name too short! (must be at least 3 characters)
    
    else if (petname.length < 3 && keyCode === ENTER){  
	  text("that name is too short!",windowWidth/2 - 20,windowHeight/2 + 150);   
    } 
    
    // name too long! (cannot be longer than 20 characters)
    
    else if (petname.length > 20) {
      text("that name is too long!",windowWidth/2 - 10,windowHeight/2 + 150);
	  if (keyCode > 64 && keyCode < 91 || keyCode > 96 && keyCode < 123){
      	return false;
        //aka stop the typing inputs if you type a lowercase or uppercase letter
	  } else if (keyCode === BACKSPACE){
		petname = petname.substring(0, petname.length - 1);
        //if name too long, user can ONLY erase letter (cannot add more letters)
	  }
    } 
    
    // user made an error while thinking of a name! please erase a letter (or more)
    
    else if (keyCode === BACKSPACE){
      // petname is now the what the user typed but MINUS one letter
      // aka return part of the petname string only from the beginning to the second to last letter
      petname = petname.substring(0, petname.length - 1); 
    } 
    
    // only type in uppercase/lowercase letters allowed! 
    // hmph, sorry-- no blobby X Æ A-12's.
    
    else if (keyCode > 64 && keyCode < 91 || keyCode > 96 && keyCode < 123){
      petname += key;
    } else {
      text("that is not a letter!",windowWidth/2,windowHeight/2 + 150);
    }
  } 
  
    //to move the blobby around (probably will not include in the home screen)
  /*else if (scene == 2) {
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



function foodSpinnies() {
  
}



function lightSwitch() {  //switch the lamp state on or off
  if (lampState) {
    lampState = false;
  } else {
    lampState = true;
  }
}


function wearDaisy(){
  daisyon = true;
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