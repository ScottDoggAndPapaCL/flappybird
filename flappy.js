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

var score = 0;
var labelScore;
var player;
var speed = 200;
var pipes;







function changeScore() {
        score = score + 1;
        labelScore.setText(score.toString());
}




function moveUp() {
    player.x = player.x + speed;
}
function moveDown() {
    player.x = player.x + speed;
}
function moveRight() {
    player.x = player.x + speed;

}
function moveLeft() {
    player.x = player.x + speed;
}

function startmovingUp() {
    player.body.velocity.y = -speed;
}

function stopmovingUp() {
    player.body.velocity.y = 0;
}
function startmovingDown() {
    player.body.velocity.y = speed;
}

function stopmovingDown() {
    player.body.velocity.y = 0;
}


function startmovingLeft() {
    player.body.velocity.x = -speed;
}

function stopmovingLeft() {
    player.body.velocity.x = 0;
}


function startmovingRight() {
    player.body.velocity.x = speed;
}

function stopmovingRight() {
    player.body.velocity.x = 0;
}



function addPipeBlock(x, y){
    var block = pipes.create(x, y, "pipe");

    game.physics.arcade.enable (block);
    block.body.velocity.x = -150;
}



function generatePipe(){
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 10; count = count+1) {
        if(count !=gapStart && count != gapStart + 1){
            addPipeBlock(800, count * 50);
        }
    }
    changeScore()

}

function playerJump() {
        player.body.velocity.y = -200;
}
function gameOver() {
        game.destroy();
}

function gameOver1() {
        location.reload();
}



function preload() {
    game.load.image("playerImg", "assets/nicolas-cage.png");
    game.load.image("pipe", "assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set the background colour of the scene
    game.stage.setBackgroundColor("#FFFFFF");

    labelScore = game.add.text(20,20,"0");
    player = game.add.sprite(0,210, "playerImg");
    player.width = 30;
    player.height = 40;


    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(startmovingRight);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onUp.add(stopmovingRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(startmovingLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onUp.add(stopmovingLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(startmovingUp);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onUp.add(stopmovingUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(startmovingDown);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onUp.add(stopmovingDown);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);

    game.physics.arcade.enable (player);
    player.body.gravity.y = 400;

    pipes = game.add.group();

    generatePipe();

    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
            generatePipe);

    game.add.text(110,0, "Flamin' cage", {font: "80px Algerian", fill: "#CF0000"});
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, gameOver);
}