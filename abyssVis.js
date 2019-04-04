//draw the waveform to the screen
function abyssVis(){
	//vis name
	this.name = "Abyss Visualiser";

	radius = 300;

	//draw the wave form to the screen
	this.draw = function(){
		push();
		// noFill();
		fill(255, 255, 255);
		stroke(0, 0, 0);
		strokeWeight(2);

		translate(width/2,height/2);
		beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();

		//this is the center circle
		for (var i = 0; i < wave.length; i++){
			//for each element of the waveform map it to screen 
			//coordinates and make a new vertex at the point.
			// var x = map(i, 0, wave.length, 0, width);
			// var y = map(wave[i], -1, 1, 0, height);

			// x = Math.sin(x)*100;
			// y = Math.cos(y)*100;

			// draws standard wave line
			// var x = i/wave.length*width;
			// var y = wave[i]*100;

			positionInCircle = i/wave.length*2*Math.PI;

			var x = Math.cos(positionInCircle)*radius+wave[i]*100;
			var y = Math.sin(positionInCircle)*radius+wave[i]*100;

			curveVertex(x, y);
		}
		
		endShape(CLOSE);
		pop();
	};
}
