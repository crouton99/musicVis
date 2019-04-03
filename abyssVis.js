//draw the waveform to the screen
function abyssVis(){
	//vis name
	this.name = "Abyss Visualiser";

	//draw the wave form to the screen
	this.draw = function(){
		push();
		noFill();
		stroke(255, 255, 255);
		strokeWeight(2);

		beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++){
			//for each element of the waveform map it to screen 
			//coordinates and make a new vertex at the point.
			// var x = map(i, 0, wave.length, 0, width);
			// var y = map(wave[i], -1, 1, 0, height);

			console.log(wave[i]);

			// vertex(x, y);
		}

		endShape();
		pop();
	};
}
