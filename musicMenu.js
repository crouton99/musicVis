//container function for the visualisations
function musicMenu(){
	//array to store visualisations
	this.songs = [];
	//currently selected vis. set to null until vis loaded in
	this.selectedSong = null;

	this.add = function(mus){
		this.songs.push(mus);
		console.log(this.songs);
	}

	this.selectSong = function(indexNumber){
		// for(var i = 0; i < this.songs.length; i++){
		// 	this.selectedSong = this.songs[indexNumber - 7];
		// 	console.log(selectedSong);
		return songs[indexNumber - 4]
	}
}
}
