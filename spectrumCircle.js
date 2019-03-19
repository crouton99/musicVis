function spectrumCircle(){

    this.name = "Circular Spectrum - EPILEPSY WARNING";

    this.draw = function(){
        push();

        var spectrum = fourier.analyze([0.99], [1024]);
        

        translate(width/2,height/2); //Translates to the centre of the screen.
        beginShape();
        for(var i = 0; i < spectrum.length - 65;i++){
            var angle = map(i,0,spectrum.length, 0, 360);
            var amp = spectrum[i]; //Stores the current frequency as an amplitude value.
            var radius = map(amp,0,windowHeight/8,40,200);
            background(255);
            stroke(0);
            fill((Math.floor((Math.random() * 255))+1),(Math.floor((Math.random() * 255))+1),(Math.floor((Math.random() * 255))+1));
            var x = radius * cos(angle);
            var y = radius * sin(angle);
            vertex(x ,y);
        }
        endShape(CLOSE);
        pop();
    }
}