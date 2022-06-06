let enterImage;

let arrowRight;
let arrowLeft;

// Different museum views
let museumView1, museumView2, museumView3, museumView4;
let milesInfo, murInfo, izInfo, stInfo;

// Right and left arrow image variables & wow
var right, left, wow, goBack;

let inMuseum = false;
let inInfoView = false;
let firstInfoView = true;
let museumSetup = true;

// Current view
let personView = 1;
let currView;

// variable for mp3
let song;

function preload() {
	museumView1 = loadImage("img/view1.png");
	museumView2 = loadImage("img/view2.png");
	museumView3 = loadImage("img/view3.png");
	museumView4 = loadImage("img/view4.png");
	arrowRight  = loadImage("img/right.png");
	arrowLeft   = loadImage("img/left.png");
	milesInfo	= loadImage("img/milesInfo.png");
	murInfo		= loadImage("img/murakamiInfo.png");
	izInfo		= loadImage("img/izettaInfo.png");
	stInfo 		= loadImage("img/stephenInfo.png");
	museumEntrance = loadImage("img/entrance.jpg");

	//song = loadSound('Miles_Davis_Flamenco_Sketches.mp3');
}

function setup() {
	var w = windowWidth;
	var h = windowHeight;
	// Sets up place where drawings are done
	createCanvas(windowWidth - 15, windowHeight - 25);

	drawMainWindow(true, 220);
}

function draw() {

	// Check if mouse is hovering over a painting
	var leftWidth = width *.3;
	var rightWidth = width *.78;
	var top = height *.22;
	var bottom = height * .5;

	if (inMuseum && mouseX >= leftWidth && mouseX < rightWidth
		&& mouseY >= top && mouseY <= bottom){
		// Draw 3 'WOW' lines when hovering
		wow.show();
	}
	else if (inMuseum) {
		wow.hide();
	}
}


function mouseClicked() {
	//if (song.isPlaying()) {
	//	song.stop();
	//}

	// Check if in picture space
	var leftWidth = width *.3;
	var rightWidth = width *.78;
	var top = height *.22;
	var bottom = height * .5;

	if (!inInfoView && inMuseum && mouseX >= leftWidth
		&& mouseX < rightWidth && mouseY >= top && mouseY <= bottom){
		// Draw 3 'WOW' lines when hovering
		wow.hide();

		// Need to switch back after coming back from info board
		inMuseum = false;
		drawInfoBoard();
	}
}

// Whenever user changes window size, resize canvas
function windowResized() {
	resizeCanvas(windowWidth - 15, windowHeight - 25);

	firstInfoView = true;

	if (!inMuseum && !inInfoView)
		drawMainWindow(false, 220);
	else if (!inInfoView)
		drawMuseumWindow();
	else{
		console.log("in info")
		drawInfoBoard();
	}
}


// Menu to layout the main page, called when resized & @ beginning
function drawMainWindow(isSetup, color) {
	var w = windowWidth;
	var h = windowHeight;

	// Sets background color
	background(color);

	// Create font size, & text
/*	textSize(32);
	text('The Art Room', (w/2) - 15, (h/2) - 25);
	textSize(20);
	text('Within the museum you can move around to\n\
		view art pieces that group 8 thought were \n\
		worthy to be within this digital museum.\n\
					Press the button below to enter.',
		(w/2) - 115, (h/2) + 25);*/

	// Create button to swap scenes to museum & play music
	startScreen = createImg("img/entrance.jpg");
	startScreen.size(w, h);
	
	if (isSetup){
		enterImage = createImg("img/enter.png");
		enterImage.size(300, 170)
	}
	enterImage.position((w/2) - 60, h/2 + 100);
	enterImage.mousePressed(changeButtonPress);
	enterImage.mouseReleased(releaseButtonPress);
}

// Change color on button press
function changeButtonPress() {
	console.log("in");
	//enterImage.hide();
	drawMainWindow(false, '#fae')
}

// Revert color on button press
function releaseButtonPress() {
	console.log("OUT");
	drawMainWindow(false, 220)

	drawMuseumWindow()
}

function drawMuseumWindow(view=museumView1) {
	console.log("This should change scenes");
	currView = view;

	inMuseum = true;
	background(51);
	enterImage.remove();

	// Play Miles Davis - Flamenco Sketches
	//if (!song.isPlaying()) {
	//	//song.play();
	//}

	// Add image of the floor only when first setting up museum
	image(view, 0, 0, windowWidth, windowHeight);

	if (museumSetup){
		right = createImg("img/right.png");

		left = createImg("img/left.png");

		museumSetup = false;

		// draw & hide wow lines
		wow = createImg("img/wow.png");
		wow.hide();

		// Draw go back button & hide it
		goBack = createImg("img/goBack.png");
		goBack.hide();

	}
	right.size(.2 * width, .2 * height);
	right.position(.70 * width, .80 * height);

	left.size(.2 * width, .2 * height);
	left.position(.2 * width, .80 * height);

	wow.size(.2 * width, .2 * height);
	wow.position(.4 * width, .04 * height);

	goBack.size(.2 * width, .2 * height);
	goBack.position(.4 * width, .8 * height);

	// Move view right
	right.mousePressed(moveRight);

	// Move view left
	left.mousePressed(moveLeft);

	// Set goBack mouse press to create museum view
	goBack.mousePressed(goBackAction)
}


function moveRight() {
	console.log("RIGHT");

	// If view 1 move to view 2
	if (personView == 1) {
		personView = 2;
		drawMuseumWindow(museumView2);
	}
	// If view 2 move to view 3
	else if (personView == 2){
		personView = 3;
		drawMuseumWindow(museumView3);
	}
	else if (personView == 3) {
		personView = 4;
		drawMuseumWindow(museumView4);
	}
	else {
		personView = 1;
		drawMuseumWindow();
	}
}

function moveLeft() {
	console.log("LEFT");

	// If view 1 move to view 4
	if (personView == 1) {
		personView = 4;
		drawMuseumWindow(museumView4);
	}
	else if (personView == 2) {
		personView = 1;
		drawMuseumWindow();
	}
	else if (personView == 3) {
		personView = 2;
		drawMuseumWindow(museumView2);
	}
	else {
		personView = 3;
		drawMuseumWindow(museumView3);
	}
}


function drawInfoBoard() {
	inInfoView = true;

	// Hide l/r buttons
	right.hide();
	left.hide();

	goBack.size(.2 * width, .2 * height);
	goBack.position(.4 * width, .8 * height);

	if (firstInfoView){
		firstInfoView = false;
		// Redraw background with a tint
		tint(255, 255, 255);
		image(currView, 0, 0, windowWidth, windowHeight);
		tint(0, 153, 204, 126);
		image(currView, 0, 0, windowWidth, windowHeight);

		// Show goBack Button
		goBack.show();

		let currInfo;
		if (personView == 1)
			currInfo = milesInfo;
		else if (personView == 2)
			currInfo = murInfo;
		else if (personView == 3)
			currInfo = izInfo;
		else
			currInfo = stInfo;

		// Display larger image & info
		tint(255, 255, 255);
		image(currInfo, 0, 0, windowWidth, windowHeight - 200);
	}

}

function goBackAction() {
	inInfoView = false;
	inMuseum = true;
	firstInfoView = true;

	right.show();
	left.show();
	tint(255, 255, 255);

	goBack.hide();
	drawMuseumWindow(currView);
}
