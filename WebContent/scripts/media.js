// media.js

var curPlayer;
var curSong = "/audio/Feels Like Summer (Radio Mix).mp3";

function setCurPlayer(id) {
	curPlayer = document.getElementById(id);
}

function setCurSong(title) {
	var song = curPlayer.src;
	curPlayer.src = "audio/" + title;
	curPlayer.load();
}

function playSong() {

	// Plays the song defined in the audio tag.
	curPlayer.play();

	// Calculates the starting percentage of the song.
	var percentageOfVolume = curPlayer.volume / 1;
	var percentageOfVolumeMeter = document.getElementById('volumeMeter').offsetWidth
			* percentageOfVolume;

	// Fills out the volume status bar.
	document.getElementById('volumeStatus').style.width = Math
			.round(percentageOfVolumeSlider)
			+ "px";
}

function pauseSong() {
	curPlayer.pause();
}

// toogle between play and pause
function playPauseSong() {

	// Checks to see if the song is paused, if it is, play it from where it left
	// off otherwise pause it.
	if (curPlayer.paused) {
		curPlayer.play();
	} else {
		curPlayer.pause();
	}
}

// sets the location of the song based off of the percentage of the sliderclicked.
function rewindSong() {
	curPlayer.currentTime = 0;
}

// Updates the current time function so it reflects where the user is in the song.
// This function is called whenever the time is updated. This keeps the visual in sync with the actual time.
function updateTime() {
	var currentSeconds = (Math.floor(curPlayer.currentTime % 60) < 10 ? '0'
			: '')
			+ Math.floor(curPlayer.currentTime % 60);
	var currentMinutes = Math.floor(curPlayer.currentTime / 60);
	// Sets the current song location compared to the song duration.
	document.getElementById('songTime').innerHTML = currentMinutes + ":"
			+ currentSeconds + ' / ' + Math.floor(curPlayer.duration / 60)
			+ ":" + (Math.floor(curPlayer.duration % 60) < 10 ? '0' : '')
			+ Math.floor(curPlayer.duration % 60);

	// Fills out the slider with the appropriate position.
	var percentageOfSong = (curPlayer.currentTime / curPlayer.duration);
	var percentageOfSlider = document.getElementById('songSlider').offsetWidth
			* percentageOfSong;

	// Updates the track progress div.
	document.getElementById('trackProgress').style.width = Math.round(percentageOfSlider) + "px";
}

function volumeUpdate(number) {
	// Updates the volume of the track to a certain number.
	curPlayer.volume = number / 100;
}

// Changes the volume up or down a specific number
function changeVolume(number, direction) {
	// Checks to see if the volume is at zero, if so it doesn't go any further.
	if (curPlayer.volume >= 0 && direction == "down") {
		curPlayer.volume = curPlayer.volume - (number / 100);
	}
	// Checks to see if the volume is at one, if so it doesn't go any higher.
	if (curPlayer.volume <= 1 && direction == "up") {
		curPlayer.volume = curPlayer.volume + (number / 100);
	}

	// Finds the percentage of the volume and sets the volume meter accordingly.
	var percentageOfVolume = curPlayer.volume / 1;
	var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetWidth
			* percentageOfVolume;

	document.getElementById('volumeStatus').style.width = Math
			.round(percentageOfVolumeSlider)
			+ "px";
}

// Sets the location of the song based off of the percentage of the sliderclicked.
function setLocation(percentage) {
	curPlayer.currentTime = curPlayer.duration * percentage;
}

/*
 * Gets the percentage of the click on the slider to set the song position
 * accordingly. Source for Object event and offset:
 * http://website-engineering.blogspot.com/2011/04/get-x-y-coordinates-relative-to-div-on.html
 */
function setSongPosition(obj, e) {
	// Gets the offset from the left so it gets the exact location.
	var songSliderWidth = obj.offsetWidth;
	var evtobj = window.event ? event : e;
	clickLocation = evtobj.layerX - obj.offsetLeft;

	var percentage = (clickLocation / songSliderWidth);
	// Sets the song location with the percentage.
	setLocation(percentage);
}

// Set's volume as a percentage of total volume based off of user click.
function setVolume(percentage) {
	curPlayer.volume = percentage;

	var percentageOfVolume = curPlayer.volume / 1;
	var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetWidth
			* percentageOfVolume;

	document.getElementById('volumeStatus').style.width = Math
			.round(percentageOfVolumeSlider)
			+ "px";
}

// Set's new volume id based off of the click on the volume bar.
function setNewVolume(obj, e) {
	var volumeSliderWidth = obj.offsetWidth;
	var evtobj = window.event ? event : e;
	clickLocation = evtobj.layerX - obj.offsetLeft;

	var percentage = (clickLocation / volumeSliderWidth);
	setVolume(percentage);
}

// Stop song by setting the current time to 0 and pausing the song.
function stopSong() {
	curPlayer.currentTime = 0;
	curPlayer.pause();
}