function micInput(){

        this.name = "Microphone Input";
        var mic;
        mic = new p5.AudioIn();
        mic.start();

        this.draw = function(){
            push();
            push();
            var spectrum = fourier.analyze([0.95], [1024]);
            var vol = mic.getLevel();

            translate(width/2,height/2)

            fill((Math.floor((Math.random() * 20))+1),(Math.floor((Math.random() * 20))+1),(Math.floor((Math.random() * 20))+1));
            rotate(Math.floor(Math.random()*360)+1);
            for(var i = 0; i < 10; i++){
                rect(i * 40 + vol, i * 40 + vol,vol*400,vol*400);
            }
            pop();
            translate(width/2,height/2);
            beginShape();
            for(var i = 0; i < spectrum.length- 40; i++){
                var angle = map(i,0,spectrum.length,0,360);
                var amp = spectrum[i];
                var centre = map(amp,0,windowHeight/4,40,200);
                var x = centre * cos(angle);
                var y = centre * sin(angle);
                fill(255,255,255,30);
                vertex(x,y)
            }
            endShape(CLOSE);
            pop();
        }

        

}//use ampinstead of frequency smoothing filter