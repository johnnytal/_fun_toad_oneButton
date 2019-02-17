var gameMain = function(game){
	pause_mode = false;
};

gameMain.prototype = {
	preload: function(){
        var mediaJson = game.cache.getJSON('media');
		
		soundToPlay = mediaJson.sound;
		bgColor = mediaJson.backgroundColor;

        this.game.load.audio('saraSound', 'assets/audio/' + soundToPlay + '.ogg');
	},
	
    create: function(){
    	saraSound = game.add.audio('saraSound');
    	saraSound.onStop.add(on_sound_ended, this);
    	
        play_button = this.add.image(0, 0, 'play');
        play_button.frame = 1;
        play_button.x = WIDTH / 2 - play_button.width / 2;
        play_button.y = HEIGHT / 2 - play_button.height / 2;
        
        play_button.inputEnabled = true;
        play_button.events.onInputDown.add(on_play_down, this);
        play_button.events.onInputUp.add(on_play_up, this);
        
        mode_button = this.add.image(0, 0, 'cont');
        mode_button.scale.set(.5, .5);
        mode_button.frame = 1;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_mode, this);      
    }	
};

function on_play_down(item){
	item.frame = 0;	
	saraSound.play();
	game.stage.backgroundColor = bgColor;
}

function on_play_up(item){
	if (pause_mode){
		saraSound.stop();
		play_button.frame = 1;
		game.stage.backgroundColor = '#00ffff';
	}
}

function on_sound_ended(){
	play_button.frame = 1;
	game.stage.backgroundColor = '#00ffff';
}

function toggle_mode(item){
	if (item.frame == 0){
		item.frame = 1;
		pause_mode = false;
	}	
	else{
		item.frame = 0;
		pause_mode = true;
	}
}