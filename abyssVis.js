//draw the waveform to the screen
function abyssVis(){
	//vis name
	this.name = "Abyss Visualiser";

	//creates all of the stars
	var bass;
	var stars = [];
	for (let i = 0; i < 200; i++) {
		stars.push(new star());
	}

	//main draw loop for the visualiser
	this.draw = function(){
		//analyzes the waveform of the sound, allows to find amplitude of certain frequencies using getEnergy()
		fourier.analyze();

		bass = fourier.getEnergy("bass")/200;
		//updates all of the stars
		for (let i = 0; i < 200; i++) {
			stars[i].update();
			stars[i].draw();
		}

		centerCircle('lime',10,10);
		centerCircle('magenta',-10,-10);
		centerCircle('white',0,0);
		
	};

	function centerCircle(color,x,y,) {
		radius = 300;
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
		this.x = random(0,width);
		this.y = random(0,height);
		this.radius = 0.5;
		this.z = 0;
		
		this.draw = function() {
			noStroke();
			ellipse(this.x,this.y,this.radius);
		}

		this.update = function() {
			this.radius = bass*bass;
		}
	}
}
