//draw the waveform to the screen
function abyssVis(){
	//vis name
	this.name = "Abyss Visualiser";

	//creates all of the stars
	var starSpeed = 1;
	var bass;
	var stars = [];
	for (let i = 0; i < 10000; i++) {
		stars.push(new star());
	}

	//main draw loop for the visualiser
	this.draw = function(){
		//analyzes the waveform of the sound, allows to find amplitude of certain frequencies using getEnergy()
		fourier.analyze();

		bass = fourier.getEnergy("bass")/255;

		starSpeed = 0.1+bass;
		//updates all of the stars
		push();
		translate(width/2,height/2);
		for (let i = 0; i < stars.length; i++) {
			stars[i].update();
			stars[i].draw();
		}
		pop();	

		centerCircle('lime',10,10);
		centerCircle('magenta',-10,-10);
		centerCircle('white',0,0);
		
	};

	function centerCircle(color,x,y,) {
		radius = 150;
		push();
		fill(color);
		stroke(0, 0, 0);
		strokeWeight(2);

		beginShape();
		//calculate the waveform from the fft.
		if(color == 'white'){
			var wave = fourierSmooth.waveform();
			//moves the drawing to the centre of the screen
			translate(width/2+x,height/2+y);
		}
		else{
			var wave = fourier.waveform();
			//moves the drawing to the centre of the screen
			translate(width/2+(x*bass),height/2+(y*bass));
		}
		

		//draws each vertex in a circle, where radius increases due to frequency of the song
		for (var i = 0; i < wave.length; i++){

			positionInCircle = i/wave.length*2*Math.PI;

			var x = Math.cos(positionInCircle)*radius+wave[i]*100;
			var y = Math.sin(positionInCircle)*radius+wave[i]*100;

			curveVertex(x, y);
		}
		
		endShape(CLOSE);
		pop();
	}

	function star() {
		this.x = random(-width, width);
		this.y = random(-height, height);
		this.z = random(width);
		this.r;
		
		this.draw = function() {
			noStroke();

			var sx = map(this.x / this.z, 0, 1, 0, width);
			var sy = map(this.y / this.z, 0, 1, 0, height);
		
			this.r = map(this.z, 0, width, 16, 0);
			this.r = this.r * (1+bass *bass)/5;
			ellipse(sx, sy, this.r);

		}

		this.update = function() {
			this.z -= starSpeed;
			if (this.z < 1) {
			  this.z = width;
			  this.x = random(-width, width);
			  this.y = random(-height, height);
			}
		}
	}
}
