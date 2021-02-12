var PLAY = 1;
var OVER = 0;
var HOME = 2;
var gamestate = PLAY;

var path,boy,cash,diamonds,jwellery,sword,otherJwellers;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,otherJwellersImage;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordG,otherJwellersG;

var gameoverSprite,endImg,invisibleBackground,invisibleBImg;

function preload(){
  pathImg = loadImage("sandroad.jpg");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  invisibleBImg = loadImage("boysad.jpg");
  otherJwellersImage = loadAnimation("runner1.png","runner2.png");
}

function setup(){
  
  createCanvas(500,500);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale = 2.6;


//creating boy running
boy = createSprite(70,430,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("rectangle",0,0,1130,1299);
boy.debug = false;
  

  
gameoverSprite = createSprite(220,200,10,10);
gameoverSprite.visible = false;
  
invisibleBackground = createSprite(140,250,500,500);
invisibleBackground.visible = false;
invisibleBackground.addImage("invisibleB",invisibleBImg);
invisibleBackground.scale = 1.9;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordG=new Group();
otherJwellersG = new Group();
}

function draw() {

  background(0);
 
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(swordG.isTouching(boy)||otherJwellersG.isTouching(boy)){
    gamestate = OVER;
    
  }
  
  if(gamestate === PLAY && treasureCollection <500){
     boy.x = mouseX;
  }
  
  if(gamestate === PLAY){
    
    createCanvas(500,500);
    
    gameoverSprite.visible = false;
    invisibleBackground.visible = false;
    
    path.setVelocity(0,6);
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createOtherJwellers();
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)||boy.isTouching(cashG)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 10;
    }
    else if (diamondsG.isTouching(boy)||boy.isTouching(diamondsG)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 35;
      
    }else if(jwelleryG.isTouching(boy)||boy.isTouching(jwelleryG)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 50;
      
    }else{
      if(swordG.isTouching(boy)||boy.isTouching(swordG)) {
        swordG.destroyEach();
    }
    }
  }
  else if(gamestate === OVER){
    
   
    
  gameoverSprite.addAnimation("gameover",endImg);
  gameoverSprite.visible = true;
  gameoverSprite.scale = 0.9;
  path.setVelocity(0,0);
  swordG.setVelocityEach(0,0);
  diamondsG.setVelocityEach(0,0);
  jwelleryG.setVelocityEach(0,0);
  cashG.setVelocityEach(0,0);
  otherJwellersG.setVelocityEach(0,0);
    
  swordG.destroyEach();
  diamondsG.destroyEach();
  jwelleryG.destroyEach();
  cashG.destroyEach();
  otherJwellersG.destroyEach();
    
  if(keyDown("h")){
    createCanvas(500,450);
    
    gamestate = HOME;
    invisibleBackground.visible = true
   
    
    
  }
  
   
  }
  
   if(gamestate === HOME){
      if(keyDown("space")){
      gamestate = PLAY;
    }
   }
  drawSprites();
  
  if(treasureCollection < 500 && gamestate === PLAY){
    textSize(15);
    fill("black");
    text("Collect 500 treasure to get an ",290,20);
    text("UPGRADE!!",290,40);
    text("And don't forget to",5,40);
    text("avoid the 'OtherJwellers'",5,60);
    
  }
  
  if(gamestate === PLAY || gamestate === OVER){
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
 
  }
  
  if(gamestate === OVER){
    fill("black");
    textSize(23);
    text("Press 'H' to go home",240,400);
  }
  
   if(gamestate === HOME){
    fill("black");
    textSize(20);
    text("Now i have to stay in this house FOREVER !",10,50);
    text("Unless..You play this",10,70);
    text("game AGAIN :)",10,90);
    text("Just press 'space'",10,110);
   }
  
  if(treasureCollection >= 500 && gamestate === PLAY){
    textSize(13);
    fill("black");
    text("UPGRADED!! now use 'w' to o up",290,20);
    text("'s' to come down, 'd' to go right",290,34);
    text("and 'a' to go left",290,47);
    
    if(keyDown("w")){
      boy.y = boy.y-4;
    }
    if(keyDown("s")){
      boy.y = boy.y+4;
    }
    if(keyDown("d")){
      boy.x = boy.x+4;
    }
    if(keyDown("a")){
      boy.x = boy.x-4;
    }
  }
  
 
}

function createCash() {
  if (frameCount % 40 == 0) {
  var cash = createSprite(Math.round(random(50, 350),10,10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 210;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 100 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),10, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 210;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 120 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 210;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 95 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 210;
  swordG.add(sword);
  }
}

function createOtherJwellers(){
  
  if(frameCount%100 === 0){
    otherJwellers = createSprite(250,-10,10,10);
    otherJwellers.addAnimation("OJ",otherJwellersImage);
    otherJwellers.scale = 0.06;
    otherJwellers.setCollider("rectangle",0,0,1130,1299);
    otherJwellers.debug = true;
    otherJwellers.setVelocity(0,8);
    otherJwellers.x = Math.round(random(50,250));
    
    otherJwellersG.add(otherJwellers);
  }
}