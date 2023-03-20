var bgSprite;
var bgImage;
var player;
var playerImage;
var bullet;
var bulletImage;
var enemy;
var enemyImage;
var meteor;
var meteorImage;
var obstacleGroup;
var totalBullets = 50;
var bulletGroup;
var life = 3;
var currentlife = 3;

function preload(){
      //Load the images
      bgImage = loadImage("Images/bg2.jpg");
      playerImage = loadImage("Images/spaceship.png");
      bulletImage = loadImage("Images/bullet.png");
      enemyImage = loadImage("Images/enemy spaceship.png");
      meteorImage = loadImage("Images/meteor.png")

}
  
function setup(){

    createCanvas(windowWidth,windowHeight);
    //Create bg and add velocity to it 
    bgSprite = createSprite(windowWidth/2,windowHeight/2,50,50);
    bgSprite.addImage(bgImage);
    bgSprite.scale = 0.7;
    bgSprite.velocityX = -3;
    //Create player and add image
    player = createSprite(200,windowHeight-50,20,20);
    player.addImage(playerImage);
    player.scale = 0.5;

    obstacleGroup = new Group();

    bulletGroup = new Group();

}

function draw(){
      //Background should not end
      if (bgSprite.x<100){
          bgSprite.x = windowWidth/2;
      }

      //Add movement keys to the player
      if (keyDown("w")){
          player.y = player.y-10;
      }

      if (keyDown("s")){
          player.y = player.y+10;
      }

      if (keyDown("a")){
          player.x = player.x-10;
      }

      if (keyDown("d")){
          player.x = player.x+10;
      }

      //Set a boundary for the player
      if (player.y<0){
          player.y = 30;
      }

      if (player.y>windowHeight){
          player.y = windowHeight-30;
      }

      if (player.x<0){
          player.x = 30;
      }

      if (player.x>windowWidth){
          player.x = windowWidth-50;
      }

      //Create bullet
      if (keyWentDown("space")){
          bullet = createSprite(player.x + 75,player.y-2,10,10);
          bullet.addImage(bulletImage);
          player.depth = bullet.depth + 1;
          //bullet.depth = player.depth - 1;
          bullet.velocityX = 10;
          bullet.scale = 0.1;

          bullet.lifetime = 250;

          bulletGroup.add(bullet);

          totalBullets = totalBullets - 1 ;
          
      }
      spawnObstacles();


      obstacleGroup.overlap(bulletGroup,destroyEnemy);

      obstacleGroup.overlap(player,handlePlayerLife);

      

      

      drawSprites();

      displayScore();

  
}

function spawnObstacles(){
    //Spawn enemy spaceships
    if (frameCount % 80 === 0 ){
        var obstacle = createSprite(windowWidth,Math.round(random(100,windowHeight-100)),20,20);
        var r = Math.round(random(1,2));
        switch(r){
            case 1 : obstacle.addImage(enemyImage);
            break ; 
            case 2 : obstacle.addImage(meteorImage);
            break ;
            default : obstacle.addImage(enemyImage);
            break ;

        }
        
        obstacle.scale = 0.1;
        player.depth = obstacle.depth + 1 ;
        obstacle.velocityX = -5;

        obstacle.lifetime = 250;

        obstacleGroup.add(obstacle);
    }
}

function destroyEnemy(obstacle,bullet){
         obstacle.destroy();
         bullet.destroy();
         totalBullets = totalBullets + 1 ;
}

function handlePlayerLife(obstacle,player){
         currentlife = currentlife - 1;
         obstacle.destroy();
}

function displayScore(){
         text("Bullets = "+totalBullets,displayWidth-200,100);
         text("Lives = "+currentlife,displayWidth-200,150);
}

