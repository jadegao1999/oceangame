var stretchy;
var egg;
var babyTurtle;

var jellyFish;
var plasticBag;
var straw;
var worm;
var seaCucumber;
var fish;
var fishNet;
var seaweed;
var sponge;
var cap;
var blueFishy;
var direction = 90;
var textbox;
var endPage;

var goodFood;
var goodFoodElements;
var goodFoodSprite;
var badFood;
var badFoodElements;
var badFoodSprite;

let bg;
var text;

var goodScore=0;
var badScore=0;

var turtleAnimation;

function preload() {
  bg = loadImage('assets/underwater-2615376.jpg');
  egg = loadImage('assets/face.png');
  jellyFish = loadImage('assets/Jelly Fish.png');
  //babyTurtle = loadImage('assets/babyTurtle.png');
  //babyTurtle = loadAnimation('assets/babyTurtle.png', 'assets/Baby Turtle 2.png');
  plasticBag = loadImage('assets/Plastic Bag.png');
  straw = loadImage('assets/Straw.png');
  seaCucumber = loadImage('assets/Sea Cucumber.png');
  seaweed = loadImage('assets/seaweed.png');
  fish = loadImage('assets/fish.png');
  fishNet = loadImage('assets/net.png');
  blueFishy = loadImage('assets/bluefishy.png');
  sponge = loadImage('assets/sponge.png');
  textbox = loadImage('assets/textbox_net.png');
  endPage = loadImage('assets/endpage.png');
  worm = loadImage('assets/Worm_1.png');
  cap = loadImage('assets/cap.png');

}

function setup() {
  fullscreen();
  createCanvas(windowWidth, windowHeight);

  var audio = new Audio('assets/ocean.mp3');
  audio.play();

  goodFoodElements = [jellyFish, fish, seaCucumber, blueFishy, seaweed, worm];
  badFoodElements = [straw, plasticBag, sponge, fishNet, cap];
  goodFoodLabels = ['jellyFish', 'fish', 'seaCucumber', 'blueFishy', 'seaweed', 'worm'];
  badFoodLabels = ['straw', 'plasticBag', 'sponge', 'fishNet', 'cap'];


  stretchy = createSprite(400, 200, 10, 10);

  stretchy.addImage('egg', egg);
  stretchy.addAnimation('normal', 'assets/babyTurtle.png', 'assets/babyTurtle.png', 'assets/BabyTurtle_2.png', 'assets/BabyTurtle_2.png');
  stretchy.changeImage(egg);
  stretchy.debug = false;
  stretchy.setDefaultCollider();


  stretchy.maxSpeed = 10;
  console.log(stretchy);


  goodFood = new Group();
  for(var i=0; i<10; i++)
  {
    var randomNum = getRandomInt(0,6);
    var goodFoodSprite = createSprite(random(0, width), random(0, height));
    goodFoodSprite.addImage(goodFoodLabels[randomNum], goodFoodElements[randomNum]);
    goodFoodSprite.debug = false;
    goodFoodSprite.setDefaultCollider();
    goodFood.add(goodFoodSprite);
  }

  badFood = new Group();
  for(var i=0; i<13; i++)
  {
    var randomNum = getRandomInt(0,5);
    var badFoodSprite = createSprite(random(0, width), random(0, height));
    badFoodSprite.addImage(badFoodLabels[randomNum], badFoodElements[randomNum]);
    badFoodSprite.debug = false;
    badFoodSprite.setDefaultCollider();
    badFood.add(badFoodSprite);
  }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function draw() {
  background(bg);
  stretchy.velocity.x = (mouseX-stretchy.position.x)/10;
  stretchy.velocity.y = (mouseY-stretchy.position.y)/10;

  stretchy.overlap(goodFood, collect);
  stretchy.overlap(badFood, collect);

  if (goodScore >= 4) {
    stretchy.changeAnimation('normal');
  }


  drawMoreFood();
  drawSprites();

  console.log(goodScore);
}


function collect(stretchy, collected) {
  console.log(collected.getAnimationLabel());
  scoreBoard(collected);
  console.log("Good Score:" + goodScore);
  console.log("Bad Scorer:" + badScore);
  collected.remove();
  console.log(collected);
  insert(collected);
}


function scoreBoard(collected) {
  if (goodFoodLabels.indexOf(collected.getAnimationLabel()) > -1) {
    goodScore++;
  }
  if (badFoodLabels.indexOf(collected.getAnimationLabel()) > -1) {
    badScore++;
  }
}



function drawMoreFood() {
  if (goodFood.size() <= 5) {
      var randomNum = getRandomInt(0,6);
      var goodFoodSprite = createSprite(random(0, width), random(0, height));
      goodFoodSprite.addImage(goodFoodLabels[randomNum], goodFoodElements[randomNum]);
      goodFoodSprite.debug = false;
      goodFoodSprite.setDefaultCollider();
      goodFood.add(goodFoodSprite);
  }

  if (badFood.size() <= 8) {
      var randomNum = getRandomInt(0,5);
      var badFoodSprite = createSprite(random(0, width), random(0, height));
      badFoodSprite.addImage(badFoodLabels[randomNum], badFoodElements[randomNum]);
      badFoodSprite.debug = false;
      badFoodSprite.setDefaultCollider();
      badFood.add(badFoodSprite);
  }
}


function popupWindow() {
  var modal = document.getElementById('textbox');

  modal.addEventListener('click', (event) => {
  // if (event.target === modal) {
    modal.close('cancelled');
  // }
  });

}

function insert(collected) {
  var textImage = document.getElementById("textboxImage");
  var modal = document.getElementById('textbox');

  if (badFoodLabels.indexOf(collected.getAnimationLabel()) == 3){
    textImage.src = "assets/textbox_net.png";
    modal.showModal();
  }

}
