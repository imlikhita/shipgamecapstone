var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg,restartimg,gameoverimg;
var water, ship, helicopter, bomb,gameover;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restartimg=loadImage("restart.png")
  gameoverimg=loadAnimation("gameOver.png")
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
 water=createSprite(500,350);
 water.addImage(waterbg);
 water.velocityX=3;
 
 
 
 //restart=createSprite(400,150);
  
  
  //creating ship
  ship=createSprite(100,250,200,50);
  ship.addImage("ship",shipimg);
  ship.scale=0.55;
  
  //creating helicopter group
  helicopterGroup=new Group();

  //creating bomb group
  bombGroup=new Group();


  //ship.debug = "true";
  //ship.setCollider("rectangle",50,200,400,600)

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
 
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);
    ship.x=World.mouseX;
    
    //Call user defined function
    spawnHelicopter();
    spawnBomb();
    
   
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  if(gameState === END){
   
  ship.addImage("ship",restartimg);
  //image(gameoverimg,width/2,height/2)
  fill("red")
  textSize(60);
  text("GAME OVER",200,250);
    
   //water velocity becomes zero
   water.setVelocityX(0);

   //destroy Helicopter group
    helicopterGroup.destroyEach();
   

   //destroy bomb group
    bombGroup.destroyEach();
    //gameover();
        
  }
  
 
 //for infinite background 
 if(water.x > 500)
 {
    water.x = 400;
  }
    
  drawSprites();
 
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
  if (frameCount % 200 == 0) {
    bomb = createSprite(Math.round(random(50,700)),10,20,50);
    bomb.addImage(bombimg);
    bomb.setVelocity(0,3);
      
    bomb.scale = 0.18;
      
    bombGroup.add( bomb);
  }
}