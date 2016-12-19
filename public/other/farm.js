// ----------------------- GLOBALS ----------------------- //
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.height = 650;
canvas.width = 400;


// ----------------------- IMAGE MANAGER ----------------------- //

var imgSources = {
	water: 'http://www.clipartbest.com/cliparts/acq/b4G/acqb4GgcM.png',
	cat: 'other/img/gude.png', // http://piq.codeus.net/static/media/userpics/piq_266550_400x400.png
	invCoin: '/other/img/invCoin.png',
	thirstCoin: '/other/img/thirstCoin.png',
	meteor: '/other/img/meteor.png',
	star: '/other/img/star.png'
}

var img = {};

// When this is true, all images have successfully been loaded.
var canPlay = false;

// Creation of Image objects.
img.water = new Image();
img.cat = new Image();
img.invCoin = new Image();
img.thirstCoin = new Image();
img.meteor = new Image();
img.star = new Image();

// On each image load, signify that it has been loaded.
img.water.onload = function() { imageLoaded() };
img.cat.onload = function() { imageLoaded() };
img.invCoin.onload = function() { imageLoaded() };
img.thirstCoin.onload = function() { imageLoaded() };
img.meteor.onload = function() { imageLoaded() };
img.star.onload = function() { imageLoaded() };

// Set sources for our images.
img.water.src = imgSources.water;
img.cat.src = imgSources.cat;
img.invCoin.src = imgSources.invCoin;
img.thirstCoin.src = imgSources.thirstCoin;
img.meteor.src = imgSources.meteor;
img.star.src = imgSources.star;

// For tracking when our images have loaded.
var numImages = 6;
var currentlyLoaded = 0;

// When all images are loaded, we can play the game.
var imageLoaded = function() {
	if (++currentlyLoaded === numImages) canPlay = true;
}

// ----------------------- CAT CLASS (PLAYER) ----------------------- //

var Cat = function(x, y, health, img) {
	this.x = x;
	this.y = y;
	this.health = health;
	this.img = img;
}

Cat.prototype.move = function(dir) {
	if (dir === 'w') {
		if (this.x <= 0) return;
		this.x -= 50;
	} else { 
		if (this.x >= canvas.width - 50) return;
		this.x += 50;
	}
}

Cat.prototype.draw = function() {
	ctx.drawImage(this.img, this.x, this.y, 50, 50);
}


var processInput = function(e) {
	if (e.keyCode === 100) { testCat.move('e'); }
	if (e.keyCode === 97) { testCat.move('w'); }
}

window.addEventListener('keypress', processInput, true);

// ----------------------- FALLING CLASS ----------------------- //

var Falling = function(x, y, speed, img) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.speed = speed;
}

Falling.prototype.draw = function() {
	this.y += this.speed;
	ctx.drawImage(this.img, this.x, this.y, 50, 50);
}

// ----------------------- HEALTH BAR ----------------------- //

var healthbar = {};
healthbar.width = 200;
healthbar.health = null;	// out of healthbar.width (200)

healthbar.update = function(cat) {
	healthbar.health = cat.health * (healthbar.width / 10);
}

healthbar.draw = function() {
	var lx1, ly1, lx2, ly2;
	var rx1, ry1, rx2, ry2;

	lx1 = 30;
	ly1 = 30;
	ly2 = 30;
	lx2 = healthbar.health;

	rx1 = healthbar.health + lx1;
	rx2 = healthbar.width - healthbar.health;
	ry1 = ly1;
	ry2 = ly2;

	ctx.fillStyle = 'green';
	ctx.fillRect(lx1, ly1, lx2, ly2);
	ctx.fillStyle = 'red';
	ctx.fillRect(rx1, ry1, rx2, ry2);
}

// ----------------------- COLLISION DETECTION ----------------------- //
var collisionDetect = function(cat, drops) {
	for (var i = 0; i < drops.length; i++) {
		var drop = drops[i];
		if (drop.x === cat.x && drop.y > 550 && drop.y < 600) {
			drops.splice(i, 1);
			cat.health--;
			if (cat.health < 0) cat.health = 0;
		}
	}
}


// ----------------------- TEST OBJECTS ----------------------- //

// Cat and rain
var testCat = new Cat(200, 600, 10, img.cat);
var testRain = [];

var renderRain = function(rain) {
	var copy = rain.slice();
	for (var i = 0; i < copy.length; i++) {
		rain[i].draw();
	}
	if (rain.length > 250) {
		rain.shift();
	}
}



// ----------------------- GAME LOOP ----------------------- //

var tick = 0;
var fallFrequency = 25;
var fallFrequencyMap = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9];
var speedMap = [6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 10, 11];
var fallTimes = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];

// Affects the random element of the speed frequency randomizer.
var speedCoefficient = 6;

// Manages whether the game is currently over.
var gameOver = false;

// This score is not updated until the end of the game.
var score;




var loop = {
	update: function() {

		// Incremement tick, reduce powerup timers, clear and paint background.
		tick++;

		// Check for game over.
		if (testCat.health === 0) {
			gameOver = true;
		}

		// Do the following only if the game is still on.
		if (!gameOver) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = '	#ADD8E6';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			// Update fall frequency over time. (Makes the game harder.)
			if (tick > fallTimes[0]*60) {
				fallFrequency = fallFrequencyMap[0];
				speedCoefficient = speedMap[0];
				speedMap.shift();
				fallFrequencyMap.shift();
				fallTimes.shift();
			}

			// Adds new RAIN to be rendered. Increased rain and speed with time. 
			if (tick % fallFrequency === 0) {
				var randSpeed = Math.ceil(Math.random() * speedCoefficient) + 2;
				var randX = ~~(Math.random() * 10) * 50;
				// Get a random image.
				var choices = [img.water, img.meteor, img.star];
				var randImg = choices[~~(Math.random() * choices.length)];


				testRain.push(new Falling(randX, -50, randSpeed, randImg));
			}


			// Detect for collisions and update the health bar.
			collisionDetect(testCat, testRain);
			healthbar.update(testCat);
		
		}

		if(gameOver) {
			score = score || tick;
		}

	},

	draw: function() {

		if (!gameOver) {
			testCat.draw();
			renderRain(testRain);
			healthbar.draw();

			// Display text for the score.
			ctx.font = '25px serif';
			ctx.fillText("Score:" + tick, 250, 55);
		}

		if (gameOver) {

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.font = '40px serif';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
			ctx.fillText('Final Score:' + score, canvas.width / 2, canvas.height / 2 + 40);
		}

	}

}

var looping = setInterval(function() {
	loop.update();
	loop.draw();
}, 1000/ 60);





