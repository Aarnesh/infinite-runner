var score = 0

function preload(){
  backgroundImg = loadImage('ground.jpg')
  kidImg = loadAnimation('kid1.png','kid2.png','kid3.png')
  coinImg = loadImage('coin.png')
  
}

function setup() {
  createCanvas(displayWidth,displayHeight/2);
  
  ground = createSprite(0,0,400,400)
  ground.addImage(backgroundImg)
  ground.scale = 1.5;
  
  
  kid = createSprite(40,330,10,30)
  kid.addAnimation('kids',kidImg)
  kid.scale=0.8
  
  invisibleGround = createSprite(250,390,500,20)
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
}

function draw() {
  background(220);

  camera.position.x = displayWidth/2
  camera.position.y = kid.y
  
  ground.velocityX = -3;
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
    kid.velocityY = -10;
  }
  kid.velocityY = kid.velocityY + 0.8
  
  if(kid.isTouching(coinsGroup)){
    coinsGroup.destroyEach()
    score = score + 1
  }
  
  kid.collide(invisibleGround)
  spawnCoins();
  drawSprites();
  
  text("Score: "+ score, displayWidth-100,displayHeight/4)
}

function spawnCoins(){
  if(frameCount % 150 === 0){
    coin = createSprite(400,random(180,250),20,20)
    coin.addImage(coinImg)
    coin.scale = 0.5
    coin.velocityX = -(3+3*score/100);
    coin.lifetime = 200;
    coinsGroup.add(coin)
  }
}