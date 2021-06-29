var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var endImg;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(width / 2, windowHeight / 2);
  path.addImage(pathImg);
  path.velocityY = 6;

  //creating boy running
  boy = createSprite(width / 2, height - 20, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.1;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() {
  background(0);
  boy.x = World.mouseX;
  edges = createEdgeSprites();
  boy.collide(edges);

  path.velocityY = 4;

  if (gameState === PLAY) {
    //code to reset the background
    if (path.y > height) {
      path.y = height / 2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }  if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 50
    } if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 50
    }  if (swordGroup.isTouching(boy)) {
      gameState = END;
    }
  } else if (gameState === END) {
    path.velocityY = 0;
    boy.scale = 0.3;
    boy.addAnimation("SahilRunning", endImg);
    boy.x = width / 2;
    boy.y = height / 2;
    boy.scale = 0.6;

    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);

    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
  }

  drawSprites();
  textFont("impact");
  textSize(35);
  fill("orange");
  text("Treasure: " + treasureCollection, windowWidth/2, windowHeight*1/13);
}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.3;
    cash.velocityY = 3;
    cash.lifetime = windowHeight;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.08;
    diamonds.velocityY = 3;
    diamonds.lifetime = windowHeight;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.2;
    jwellery.velocityY = 3;
    jwellery.lifetime = windowHeight;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.15;
    sword.velocityY = 3;
    sword.lifetime = 200;
    swordGroup.add(sword);
  }
}
