var gameMain = function(game){};

gameMain.prototype = {
	preload: function(){
        var mediaJson = game.cache.getJSON('media');
		soundToPlay = mediaJson.sound;
		bgColor = mediaJson.backgroundColor;

        this.game.load.audio('saraSound', 'assets/audio/' + soundToPlay + '.ogg');
	},
	
    create: function(){
    	saraSound = game.add.audio('saraSound');
    	saraSound.onStop.add(reset, this);
    	
        button = this.add.image(0, 0, 'button');
        button.x = WIDTH / 2 - button.width / 2;
        button.y = HEIGHT / 2 - button.height / 2;
        
        button.inputEnabled = true;
        button.events.onInputDown.add(playSound, this);
    }	
};

function playSound(item){	
	saraSound.play();
	game.stage.backgroundColor = bgColor;
}

function reset(){
	game.stage.backgroundColor = '#aa0000';
}
