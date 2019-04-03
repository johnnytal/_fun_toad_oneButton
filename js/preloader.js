var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
    	progressTxt = this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px', fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
  
        loadingTxt = this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px', fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });

 		game.load.spritesheet("cont", "assets/images/cont.png", 325/2, 102);
        
        game.load.image('bg', 'assets/images/bg.png');
        
        game.load.image('btn0', 'assets/images/btn1.png');
        game.load.image('btn1', 'assets/images/btn2.png');
        game.load.image('btn2', 'assets/images/btn3.png');
        
        game.load.audio("note1", "assets/audio/note1.mp3");
        game.load.audio("note2", "assets/audio/note2.mp3");
        game.load.audio("note3", "assets/audio/note3.mp3");
    },
    
    create: function(){
        this.game.state.start("Game"); 
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};