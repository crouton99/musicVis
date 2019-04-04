//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sounds = [];
var songNames = [];
//variable for p5 fast fourier transform
var fourier;

function preload(){
	sounds.push(loadSound('assets/grandsonBlood.mp3'));
	sounds.push(loadSound('assets/breaks2.mp3'));
	sounds.push(loadSound('assets/gaulinMoonlight.mp3'));
	sounds.push(loadSound('assets/zeroLeave.mp3'));
	songNames = ["Blood","Breaks","Moonlight","Leave"];
}

function setup(){
	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 angleMode(DEGREES);
	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new abyssVis());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
	 vis.add(new spectrumCircle());
	 vis.add(new micInput());
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
