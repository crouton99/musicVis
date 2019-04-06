//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		if(!this.playbackButton.hitCheck()){
			var fs = fullscreen();
			fullscreen(!fs);
		}
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 55){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}

		if(keycode > 54 && keycode < 58){
			this.playbackButton.changeSong(keycode-49-vis.visuals.length);
			console.log(keycode-49-vis.visuals.length);
		}

		if(keycode == 48){
			this.playbackButton.changeSong(3);
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){

			text("Select a visualisation:", 100, 30);
			text("Select a Song:",100,30+(70 + vis.visuals.length*40));
			this.menu();
		}	
		pop();

	};

	this.menu = function(){
		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = 70 + i*40;

			if(vis.visuals[i].name == vis.selectedVisual.name){
				fill("yellow");
			}

			text((i+1) + ":  " +vis.visuals[i].name, 100, yLoc);
			fill("white");
		}

		//draws out the names of the songs
		for(var i = 0; i < songNames.length; i++){
			var yLoc = 140 + vis.visuals.length*40 + i*40;

			if(i == this.playbackButton.currentSong){
				fill("yellow");
			}

			text((i+1+vis.visuals.length) + ":  " + songNames[i], 100, yLoc);
			fill("white");
		}
	};
}


