var canvas;
var stage;
var monsters = Array();
var bullets = Array();
var imgBackground = new Image();
var imgMonster = new Image();
var imgPlayer = new Image();
var imgBullet = new Image();
var loaded = 0;
var level = 0;
var difficult = 1;
var gamer;
var annonce;
var score = 0;
var lost = false;

$('document').ready(function(){
	init();
	initTicker();

	$('#start').click(function(){
		createMonsters(52);
	});
});

$(window).keydown(function(event) {
	gamer.vcode = event.which;
});

//initialise le canvas et telecharge les resources
function init(){
	canvas = document.getElementById('gfxWindow');
	imgBackground.onload = handleImageLoad;
	imgBackground.onerror = handleImageError;
	imgMonster.onload = handleImageLoad;
	imgMonster.onerror = handleImageError;
	imgPlayer.onload = handleImageLoad;
	imgPlayer.onerror = handleImageError;
	imgBullet.onload = handleImageLoad;
	imgBullet.onerror = handleImageError;
	imgBackground.src = 'images/background.png';
	imgMonster.src = 'images/spriteMonsters.png';
	imgPlayer.src = 'images/player.png';
	imgBullet.src = 'images/bullet.png';
}

// appel quand l'image est charge
function handleImageLoad(e){
	loaded++;
	if(loaded == 4){
		startGame();
	}
}

// appel quand il y a un probleme avec l'image
function handleImageError(e) {
	console.log("Error Loading Image : " + e.target.src);
}


function initTicker(){
   createjs.Ticker.addListener(window);
   createjs.Ticker.useRAF = true;
   createjs.Ticker.setFPS(60);
}



function startGame(){
	stage = new createjs.Stage(canvas);
    var bg = new createjs.Bitmap(imgBackground);
	stage.addChild(bg);
	setGameText("Click START GAME when ready!");
	initPlayer();
}

// genarateur random de monstre
function createMonsters(m){
	stage.removeChild(annonce);
	level++;
	lost = false;
	changeLevel();

	var x = 20;
	var y = 20;
	for(i = 0; i < m; i++){
		var obj = new Monster(imgMonster,x,y);
		obj.IDLEWAITTIME -= (level * difficult);
		monsters.push(obj);
		stage.addChild(obj);
			if(x < 700){
				x += 60;
			}else{
				x = 20;
				y += 50;
			}
	}
}

// dessine le joueur sur le jeu
function initPlayer(){
	gamer = new Player(imgPlayer, canvas.width / 2, canvas.height - 60);
	stage.addChild(gamer);
}

// text sur l'ecran
function setGameText(val){
	annonce = new createjs.Text(val,"20px Arial", "#ff7700");
	annonce.x = canvas.width / 2 - 150;
	annonce.y = canvas.height / 2;
	stage.addChild(annonce);
}

// recommence la partie apres avoir perdu
function restartGame(){
	monsters.splice(0,monsters.length);
	bullets.splice(0,bullets.length);
	stage.removeAllChildren();
	level--;
	startGame();

	stage.removeChild(annonce);
	if($('#lifes li').length > 0){
		$('#lifes li')[$('#lifes li').length - 1].remove();
		setGameText("You loose, press START GAME to continue");
	}else{
		setGameText("GAME OVER! You got " + score + " points this time!");
		$('#start').prop('disabled',true);
	}
}

function changeScore(){
	$('#score').html("Score: " + score);
}

function changeLevel(){
	$('#level').html("Level: " + level);
}


function tick(){
	if(monsters.length == 0 && !lost){
		createMonsters(52);
	}

	for (monster in monsters){
		var m = monsters[monster];
		m.tick();
		if(m.causeLoose(420)){
			lost = true;
			restartGame();
		}
	}

	for (bullet in bullets){
		var b = bullets[bullet];
		b.tick();
		if(b.causeLoose()){
			lost = true;
			restartGame();
		}
	}

	gamer.tick();
	stage.update();
}
