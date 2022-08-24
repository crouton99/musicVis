//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sounds = [];
var songNames = [];
//variable for p5 fast fourier transform
var fourier;
var fourierSmooth;

//mic input 
var mic;

function preload(){
	sounds.push(loadSound('assets/goodiebag.mp3'));
	sounds.push(loadSound('assets/wiitennis.mp3'));
	sounds.push(loadSound('assets/danger.mp3'));
	sounds.push(loadSound('assets/ziploc.mp3'));
	songNames = ["Goodie Bag","Wii Tennis","What's Up Danger","Ziploc"];

}

function setup(){

	mic = new p5.AudioIn();
	mic.start();
	//instantiating the fourier object used to analyse the music
	fourier = new p5.FFT(0.0);
	fourier.setInput(mic);
	fourierSmooth = new p5.FFT();
	

	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 angleMode(RADIANS);
	 controls = new ControlsAndInput();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new abyssVis());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
	 vis.add(new Spectrum());

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
