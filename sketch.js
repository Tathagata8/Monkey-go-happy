
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,500);
 
  
 survivalTime = 0;
  
  //create monkey
  monkey = createSprite(60,450,30,30);
  monkey.addAnimation("run-run",monkey_running);
  monkey.scale = 0.175;
  
 
  //createing ground
  ground= createSprite(400,480,1500,20);
  ground.velocityX= -5;
  ground.x = ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstacleGroup = new Group();

  
}

function draw() {

  background(300);
  
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
    //increasing score
     survivalTime = survivalTime + Math.round(getFrameRate()/100);
    
    
    //jumping of monkey
  if(keyDown("space") && monkey.y >= 165) {
    monkey.velocityY = -12;
  
  }
    // adding gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
  // monkey running on ground
  monkey.collide(ground);
  
  
  
    spawnFood();
    spawnObstacle();
  
  drawSprites();
  
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
   

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);

 
  




}

  
  
  
 
function spawnFood() {
 if(frameCount % 80 === 0) {
  banana = createSprite(600,165,30,30);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.lifetime = 600;
  banana.velocityX = -4;
  FoodGroup.add(banana);
 }
  
 
}
  
function spawnObstacle() {
 
 if(frameCount % 300===0){
  obstacle = createSprite(600,440,30,30);
  obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   obstacle.scale = 0.2;
   
 obstacleGroup.add(obstacle);
 }
 
  
 
}
  
  
  