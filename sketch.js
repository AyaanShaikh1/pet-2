var dog,happyDog,dog1;
var database;
var foodS,foodStock;


function preload()
{
  dog1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}  

function setup() {
  createCanvas(800, 800);
  //calling DataBase
  database = firebase.database();
  //creating dog
  dog = createSprite(600,600);
  dog.addImage(dog1);
  dog.scale = 0.2;
 //creating Food
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
  Food = new food();

  feed = createButton("FEED THE DOG");
  feed.position(200,95);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(330,95);
  add.mousePressed(addFood);
}


function draw() {  
  background("cyan");
  drawSprites();
  textSize(20);
  fill("white");
  stroke("black");

 Food.display();
 
  fedTime =  database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
}

function readStock(data){
  foodS = data.val();
}

function feedDog(){
  
  dog.addImage(happyDog);
  
  Food.updatefoodstock(Food.getfoodstock() - 1) 
  database.ref('/').update({
  Food:Food.updatefoodstock(),
  FeedTime:hour() 
  });
}
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}


