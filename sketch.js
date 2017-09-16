
// application information
__author__ = 'Jordan Schurmann, Luke Reynolds'
__email__ = 'jordan.schurmann@gmail.com, lreynolds188@gmail.com'
__version__ = '1.0.5'
__website__ = 'http://lukereynolds.net/'

var oldImages = new Array(3);
var newImages = new Array(3);
var newTintedImages = new Array(3);
var imgStripSystem = null;
var imgWidth = 1280;
var imgHeight = 720;
var imgSelector = null;
var pistolSound;

function preload() {
  // preload required images and sounds
  for (var i = 0; i < oldImages.length; i++){
  	oldImages[i] = loadImage('OldPhotos/oldImage' + i + '.jpg');
  }
  
  for (var j = 0; j < newImages.length; j++){
  	newImages[j] = loadImage('NewPhotos/newImage' + j + '.jpg');
  }
  
  for (var k = 0; k < newTintedImages.length; k++){
  	newTintedImages[k] = loadImage('NewPhotos/newImage' + k + '.jpg');
  }
  
  pistolSound = loadSound('Assets/startingPistol.mp3');
}

function setup() {
  createCanvas(1280, 720);
  // variable used to identify which image to use from the selected image array
  imgSelector = int(random(0, 3));
  // initialise the imgStripSystem
  imgStripSystem = new ImgStripSystem(mouseX);
  
  for (var k = 0; k < newTintedImages.length; k++){
    newTintedImages[k].filter("invert");
  }
}

function draw() {
  background(220);
  image(oldImages[imgSelector], 0, 0);
  generateImageStrip();
}

function mousePressed(){
  var temp = imgSelector
  // while the image has not been changed attempt to change it
  while (temp == imgSelector){
  	imgSelector = int(random(0, 3));
  }
  pistolSound.play();
}

function generateImageStrip(){
  imgStripSystem.run();
  imgStripSystem.addStrip();
}

var ImgStripSystem = function(_x){
  this.xLoc = _x;
 	this._imgStrips = [];
  for (var i = 0; i < 0; i++) {
  	this._imgStrips.push(new ImgStrip(this.xLoc));
  }
}

ImgStripSystem.prototype.run = function () {
  var _length = this._imgStrips.length - 1;
  
  // for each ImgStrip in the array call their run method and if 
  // their lifespan is over remove them from the array
  for (var i = _length; i >= 0; i--) {
    var _imgStrip = this._imgStrips[i];
    _imgStrip.run();
    if (_imgStrip.isDead()) {
      this._imgStrips.splice(i, 1);
    }
  }
}

ImgStripSystem.prototype.addStrip = function (_location) {
  // if there is no user input randomise the location of the strip
  if (mouseX == pmouseX){
  	this._imgStrips.push(new ImgStrip(random(0, 1280)));
  } else {
  	this._imgStrips.push(new ImgStrip(mouseX)); 
  }
}

var ImgStrip = function(_x, _img){
  this._xLocation = _x;
  this._imgStrip = _img;
  this._stripWidth = random(5,20);
  this._lifespan = 50.0;
  this._tintSelector = this.randomBool();
}

ImgStrip.prototype.randomBool = function()
{
  var num = int(random(8));
  if (num != 0){
   	return false; 
  } else {
   	return true; 
  }
}

ImgStrip.prototype.run = function(){
  this.update();
  this.render();
}

ImgStrip.prototype.update = function(){
  this._lifespan -= 2;
}

ImgStrip.prototype.render = function(){ 
  if (!this._tintSelector){
 		image(newImages[imgSelector], this._xLocation-this._stripWidth/2, 0, this._stripWidth, 720, this._xLocation, 0, this._stripWidth, 720);
	} else {
    image(newTintedImages[imgSelector], this._xLocation-this._stripWidth/2, 0, this._stripWidth, 720, this._xLocation, 0, this._stripWidth, 720);
  }
}

ImgStrip.prototype.isDead = function(){
 	if (this._lifespan <= 0) {
    return true;
  } else {
    return false;
  }
}
