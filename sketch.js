
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, jungleImage;
var ivisibleGround;
var FoodGroup, obstacleGroup;
var PLAY;
var END;
var score=0;
var gameState="PLAY";


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jungleImage= loadImage("C16bg.png");
}



function setup() {
  createCanvas(600,600);
  
  invisibleGround=createSprite(0,535,1200,5);
  invisibleGround.visible=false;
  
  ground=createSprite(0,300,1500,30);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.scale=1;
  ground.addImage(jungleImage);
  
  monkey=createSprite(80,460,20,40);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.20;
  
  
  obstaclesGroup=createGroup();
  bananaGroup=createGroup();
}


function draw() {
  background("black");
  
 if(gameState==="PLAY"){

   if(keyWentDown("space")&&monkey.y>=470){
     monkey.velocityY=-22;
   }
  console.log(monkey.y)
 
  monkey.velocityY=monkey.velocityY+0.8;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //obstaclesGroup.collide(ground);
  
  score=Math.ceil(getFrameRate()/62);
  
  monkey.collide(invisibleGround);
  monkey.debug=false;
  
  if(obstaclesGroup.isTouching(monkey)){
   gameState="END";
  }
   
  banana();
  rock();
 } 
  if(gameState==="END"){
    obstaclesGroup.destroyEach();
   bananaGroup.destroyEach();
   bananaGroup.setVelocityXEach(0);
   obstaclesGroup.setVelocityXEach(0);
   ground.visible=false;
   ground.velocityX=0;
   monkey.visible=false;
   fill("yellow");
   stroke("yellow");
   textSize(40);
   text("GAME OVER",150,225);
   textSize(25);
   fill("orange");
   stroke("orange");
   text("Press R To Restart The Game",100,335);
    if(keyDown("R")){
      reset();
    }
  }
  drawSprites();
  
  stroke("black");
  textSize(26);
  fill("cyan");
  text("Survival Time: "+score,200,50);
}

function banana(){
  if(frameCount%90===0){
  var banana=createSprite(600,100,10,50)
  banana.addImage(bananaImage)
  banana.velocityX=-(4+score/10);
  banana.scale=0.20;
    banana.y=Math.round(random(120,200))
    banana.lifetime=300
    monkey.depth=banana.depth+1
    bananaGroup.add(banana)
}
}
function rock(){
  if (frameCount % 220 ===0){
    var object=createSprite(600,475,20,40);
    object.addImage(obstaceImage);
    object.velocityX = -(6 + score/10);
    object.lifetime=150;
    obstaclesGroup.add(object);
    object.scale=0.25;
  }
}
function reset(){
  gameState = "PLAY";
  monkey.visible = true;
  ground.visible = true;
  ground.velocityX=-4;
  score = 0;
}


