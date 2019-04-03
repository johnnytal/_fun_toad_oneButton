var gameMain = function(game){
	SOUND_BUTTONS_N = 3; // number of buttons (duh)
	
	gate_mode = false; 
	// true - the sound will stop playing once we stop pressing the button (to play the full sound we need to keep pressing)
	// fasle - once we press the button the sound will keep playing till it is finished.
	
	stop_mode = true;
	// true - if we press a working button it will stop the audio
	// fasle - there is no way to stop the audio once we start it (unless we are in gate_mode)
	
	soundButtons = [];
};

gameMain.prototype = {
    create: function(){
    	game.stage.backgroundColor = '#ff2256';
    	
    	game.add.image(0, 0, 'bg').alpha = 0.4;

    	createSoundBtns();

    	game.input.addPointer(); // to allow more than 2 buttons pressed simultaneously, add more pointers for more buttons

        mode_button = this.add.image(0, 0, 'cont'); // that's the gate_mode on/off button, probably unnecessary in the final version
        mode_button.frame = 1;
        mode_button.y = HEIGHT - mode_button.height;
        mode_button.x = WIDTH - mode_button.width - 50;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_mode, this);

    	loadSounds();
    	initPlugIns();
    }	
};

function createSoundBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < SOUND_BUTTONS_N; b++){
    	soundButtons[b] = soundBtnsGroup.create(28 + (220 * b), 50, 'btn' + b);
    	soundButtons[b].inputEnabled = true;

		soundButtons[b].events.onInputDown.add(playSound, this);
        soundButtons[b].events.onInputUp.add(function(){
            if (gate_mode) stopSounds();
        }, this);  
    }
}

function playSound(item, kb){	
	
	var place = soundButtons.indexOf(item);
	var sprite = soundButtons[place];
	var sound = sounds[place];

    if (!sound.isPlaying){
        if (!sound.paused){
            sound.play();  
            navigator.vibrate(200);  
        }
        else{
            sound.resume();
        }
		
		sprite.frame = 1;
        sprite.tint = 0xe3dfff;
        
        sound.onStop.add(function(){
           sprite.frame = 0;
           sprite.tint = 0xffffff;
        }, this);
    }
    
    else{
    	if (stop_mode){
        	sound.stop();
        }
    }    
}

function stopSounds(){
    for (n = 0; n < sounds.length; n++){
        sounds[n].stop();
    }   
}

function toggle_mode(item){
	if (item.frame == 0){
		item.frame = 1;
		gate_mode = false;
	}	
	else{
		item.frame = 0;
		gate_mode = true;
	}
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep device awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(100, false);} catch(e){} // change device media volume to maximum
}

function loadSounds(){
	sounds = [
	    sfx1 = game.add.audio('note1', 0.5),
	    sfx2 = game.add.audio('note2', 0.5),
	    sfx3 = game.add.audio('note3', 0.5)
    ];
}