let enterImage;
let startScreen;
let arrowRight;
let arrowLeft;
poem = "A poem will appear here!";
calls = 0;
let lastLocation;
// Different museum views
let museumHall, museumCenter,chrisRoom;

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

function getAjax(){
// Using the core $.ajax() method
$.ajax({

    url: "https://poetrydb.org/author,title/Shakespeare;Sonnet",

    data: {

          },

    type: "GET",

    dataType : "json",

    success: function(data) {
        console.log(data[calls].lines);
				poem = data[calls].lines;
    },

    error: function (jqXHR, textStatus, errorThrown) {

        console.log("Error:", textStatus, errorThrown);
    }
})
}


function preload() {

	museumHall = loadImage("img/hall.jpg");
	museumCenter = loadImage("img/mainCenter.jpg");
	museumView1 = loadImage("img/view1.png");
	museumView2 = loadImage("img/view2.png");
	museumView3 = loadImage("img/view3.png");
	museumView4 = loadImage("img/view4.png");
	arrowRight  = loadImage("img/right.png");
	arrowLeft   = loadImage("img/left.png");
	milesInfo	= loadImage("img/sebZoom.png");
	murInfo		= loadImage("img/chrisZoom.png");
	izInfo		= loadImage("img/izettaZoom.png");
	stInfo 		= loadImage("img/stephenZoom.png");
	museumEntrance = loadImage("img/entrance.jpg");
	artRoom1 = loadImage("img/artRoom1.jpg");
	artRoom2 = loadImage("img/artRoom2.jpg");
	museumSale = loadImage("img/artRoom.jpg");
	chrisRoom = loadImage("img/murakamiRoom.jpg");
	random = loadImage("https://random.imagecdn.app/500/150");
	stephenRoom = loadImage("img/stephenRoom.jpg");
	izettaRoom = loadImage("img/izettaRoom.jpg");
	sebRoom = loadImage("img/sebRoom.jpg");
	song = loadSound('music/Miles_Davis_Flamenco_Sketches.mp3');

}


function setup() {
	var w = windowWidth;
	var h = windowHeight;
	// Sets up place where drawings are done
	createCanvas(windowWidth - 15, windowHeight - 25);
	drawMainWindow(true, 220);


}

function draw() {

}


function mouseClicked() {
	//if (song.isPlaying()) {
	//	song.stop();
	//}

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
	if (isSetup){
		startScreen = createImg("img/entrance.jpg");
		startScreen.size(w, h);
	}
	startScreen.position(0,0);
	startScreen.mousePressed(drawMuseumWindow);

}


function drawMuseumWindow( view=museumHall) {
	console.log("This should change scenes");
	currView = view;

	inMuseum = true;
	console.log(currView);
	startScreen.remove();


	currView = view;
	// Add image of the floor only when first setting up museum
	image(view, 0, 0, windowWidth, windowHeight);
	if(view == museumHall){
		leftRoom1 = createImg("img/blank.png");
		leftRoom2 = createImg("img/blank.png");
		centerRoom = createImg("img/blank.png");
		back = createImg("img/back.png");

		leftRoom1.size(.05 * width, .25 * height);
		leftRoom2.size(.025 * width, .15 * height);
		centerRoom.size(.15 * width, .12 * height);

		back.size(.05*width, .1 * height);

		leftRoom1.position(.25 * width, .5 * height);
		back.position(.5 * width, .9 * height);
		leftRoom2.position(.32222 * width, .533 * height);

		back.mousePressed(goEntrance);
		centerRoom.position(.36 * width, .52 * height);
		centerRoom.mousePressed(changeToCenterRoom);
		leftRoom1.mousePressed(changeAPI1);
		leftRoom2.mousePressed(changeAPI2);

	}
	else if(view == museumCenter){
		console.log("in create center")
		back.mousePressed(goHall);
		room1 = createImg("img/blank.png");
		room2 = createImg("img/blank.png");
		room3 = createImg("img/blank.png");
		room4 = createImg("img/blank.png");
		room5 = createImg("img/blank.png");

		musicBox = createImg("img/blank.png");

		room1.size(.07 * width, .3 * height);
		room2.size(.05 * width, .25 * height);
		room3.size(.1 * width, .20 * height);
		room4.size(.1 * width, .20 * height);
		room5.size(.05 * width, .20 * height);
		musicBox.size(.15 * width, .15 * height);

		room1.position(.035 * width,.4 * height);
		room2.position(.185 * width,.43 * height);
		room3.position(.28 * width,.46 * height);
		room4.position(.78 * width,.46 * height);
		room5.position(.93 * width,.46 * height);
		musicBox.position(.5 * width, .5 * height);

		room1.mousePressed(changeChris);
		room2.mousePressed(changeSeb);
		room3.mousePressed(changeIzetta);
		room4.mousePressed(changeSte);
		musicBox.mousePressed(toggleSong);
		//room5.mousePressed(changeSale);

	}
	else if(view == izettaRoom){
		button = createImg("img/blank.png");
		button.size(.11 * width, .23 * height);

		button.position(.70 * width, .35 * height);
		button.mousePressed(drawInfoBoard);
		back.mousePressed(goCenter);

	}
	else if(view == sebRoom){
		button = createImg("img/blank.png");
		button.size(.11 * width, .23 * height);

		button.position(.70 * width, .35 * height);
		button.mousePressed(drawInfoBoard);
		back.mousePressed(goCenter);
	}
	else if(view == chrisRoom){
		button = createImg("img/blank.png");
		button.size(.11 * width, .23 * height);

		button.position(.70 * width, .35 * height);
		button.mousePressed(drawInfoBoard);
		back.mousePressed(goCenter);
	}
	else if(view == stephenRoom){
		button = createImg("img/blank.png");
		button.size(.11 * width, .23 * height);

		button.position(.70 * width, .35 * height);
		button.mousePressed(drawInfoBoard);
		back.mousePressed(goCenter);
	}
	else if (view == artRoom1){
		calls++;
		temp = createImg("https://source.unsplash.com/random/200x200?sig=" + calls);
		temp.size(.265 *width, .4* height);

		button = createImg("img/blank.png");
		button.size(.11 * width, .23 * height);

		button.position(.70 * width, .35 * height);

		temp.position(.35 * width, .18 * height);
		back.mousePressed(goHallFirst);
		button.mousePressed(refresh);
	}
	else if (view == artRoom2){


		textSize(15);
		text(poem, .35 *width, .2* height, 50, 200);
		box

		button = createImg("img/blank.png");
		button.size(.11 * width, .23 * height);

		button.position(.70 * width, .35 * height);


		back.mousePressed(goHallSecond);
		button.mousePressed(refresh2);

	}


}

function toggleSong(){
	if (!song.isPlaying()) {
		song.play();
	}
	else{
		song.stop();
	}
}

function changeSale(){
	room1.remove();
	room2.remove();
	room3.remove();
	room4.remove();
	room5.remove();
	drawMuseumWindow(museumSale);
}
function refresh2(){
	if(calls > 30){
		calls = 0;
	}
	getAjax();
	button.remove();
	calls++;
	drawMuseumWindow(artRoom2);

}

function goHallSecond(){
	button.remove();
	drawMuseumWindow(museumHall);
}

function refresh(){
	temp.remove();
	button.remove();
	drawMuseumWindow(artRoom1);
}
function changeAPI1(){
		leftRoom1.remove();
		leftRoom2.remove();
		centerRoom.remove();
		drawMuseumWindow(artRoom1);
}

function changeAPI2(){
		leftRoom1.remove();
		leftRoom2.remove();
		centerRoom.remove();
		drawMuseumWindow(artRoom2);
}

function goHallFirst(){
	temp.remove();
	button.remove();
	drawMuseumWindow(museumHall);
}
function goCenter(){
	drawMuseumWindow(museumCenter);
}
function goHall(){
	musicBox.remove();
	room1.remove();
	room2.remove();
	room3.remove();
	room4.remove();
	room5.remove();
	back.remove();
	drawMuseumWindow(museumHall);
}
function goEntrance(){
	inMuseum = false;
	back.remove();
	leftRoom1.remove();
	leftRoom2.remove();
	centerRoom.remove();
	drawMainWindow(true, 0);
}


function changeSte(){
	room1.remove();
	musicBox.remove();
	room2.remove();
	room3.remove();
	room4.remove();
	room5.remove();
	drawMuseumWindow(stephenRoom);
}

function changeSeb(){
	room1.remove();
	room2.remove();
	musicBox.remove();
	room3.remove();
	room4.remove();
	room5.remove();
	drawMuseumWindow(sebRoom);
}

function changeIzetta(){
	room1.remove();
	room2.remove();
	musicBox.remove();
	room3.remove();
	room5.remove();
	room4.remove();
	drawMuseumWindow(izettaRoom);
}

function changeChris(){
	room1.remove();
	room2.remove();
	room3.remove();
	musicBox.remove();
	room4.remove();
	room5.remove();
	drawMuseumWindow(chrisRoom);
}

function changeToCenterRoom() {
	leftRoom1.remove();
	leftRoom2.remove();
	centerRoom.remove();
	drawMuseumWindow(museumCenter)
}

function goInRoom(src, dst){
	image(dst, 0, 0, windowWidth, windowHeight);
}


function drawInfoBoard() {
	inInfoView = true;

	// Hide l/r buttons
	back.hide();
	goback = createImg("img/back.png");
	goback.size(.05 * width, .1 * height);
	goback.position(.5 * width, .8 * height);

	if (firstInfoView){
		firstInfoView = false;
		// Redraw background with a tint
		tint(255, 255, 255);
		image(currView, 0, 0, windowWidth, windowHeight);
		tint(0, 153, 204, 126);
		image(currView, 0, 0, windowWidth, windowHeight);



		let currInfo;
		if (currView == chrisRoom)
			currInfo = murInfo;
		else if (currView == izettaRoom)
			currInfo = izInfo;
		else if (currView == sebRoom)
			currInfo = milesInfo;
		else
			currInfo = stInfo;

		// Display larger image & info
		tint(255, 255, 255);
		image(currInfo, 0, 0, windowWidth, windowHeight );
	}
	goback.mousePressed(goBackAction);

}

function goBackAction() {
	inInfoView = false;
	inMuseum = true;
	firstInfoView = true;

	//right.show();
	//left.show();
	tint(255, 255, 255);

	goback.remove	();
	back.show();
	drawMuseumWindow(currView);
}
