// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/Nicolas-Cage.jpg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FFFFFF");
    var player = game.add.sprite(-100, -70, "playerImg");
    player.width = 1100;
    player.height = 1100;
    game.add.text(20,20, "Lookin' so fly", {font: "110px Algerian", fill: "#CF0000"});


}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}