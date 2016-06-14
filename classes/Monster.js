function Monster(src, x,y) {
	this.initialize(src, x,y);
}

Monster.prototype = new createjs.BitmapAnimation();

Monster.prototype.CURRENTTIME = 0;
Monster.prototype.IDLEWAITTIME = 60;
Monster.prototype.idle = true;
Monster.prototype.reverse = false;
Monster.prototype.scaleX = 0.4;
Monster.prototype.scaleY = 0.4;
Monster.prototype.vX = 10;
Monster.prototype.vY = 10;
Monster.prototype.minX;
Monster.prototype.maxX;
Monster.prototype.maxY;
Monster.prototype.animation;

Monster.prototype.BitmapAnimation_initialize = Monster.prototype.initialize;

Monster.prototype.initialize = function(src, x,y){
	this.x = x;
	this.y = y;
	this.minX = x;
	this.maxX = this.x + 20;
	this.maxY = this.y + 100;
	
	var localSpriteSheet = new createjs.SpriteSheet({
		images: [src],
		frames: {width: 100, height: 75, regX: 50, regY: 37.5},
		animations: {
			walk_a: [0, 1, "walk_a", 40],
			walk_b: [2, 3, "walk_b", 40],
			walk_c: [4, 5, "walk_c", 40]
		}
	});
	  
	this.BitmapAnimation_initialize(localSpriteSheet);
	this.chooseMonsterType();
	this.gotoAndPlay(this.animation);
}

Monster.prototype.chooseMonsterType = function(){
	var x = Math.round(Math.random() * 2);
	switch(x){
		case 0:
			this.animation = "walk_a";
		break;
		
		case 1:
			this.animation = "walk_b";
		break;
		
		case 2:
			this.animation = "walk_c";
		break;
	}
}

Monster.prototype.tick = function(){

this.fireBullet();
	if(this.idle){
		this.CURRENTTIME = 0;
		this.idle = false;
		
			if(this.reverse){
				if(this.x >= this.minX + 20){
					this.x -= this.vX;
				}else{
					this.y += this.vY; 
					this.reverse = false;
				}
			}else{
				if(this.x <= this.maxX){
					this.x += this.vX;
				}else{
					this.y += this.vY; 
					this.reverse = true;
				}
			}
		}else{
			if(this.CURRENTTIME < this.IDLEWAITTIME){
				this.CURRENTTIME++;
			}else{
				this.idle = true;
			}
		}
}

Monster.prototype.fireBullet = function(){
var last = 0;
	for (monster in monsters){
		var m = monsters[monster];
		if(this.x == m.x && this.y < m.y){
			last++;
		}
	}
	
	if(last == 0){
		if(this.x <= gamer.x + 30 && this.x >= gamer.x - 30){
			if(Math.round(Math.random() * 100) <= difficult){
				var b = new Bullet(imgBullet, this.x,this.y + 10, 2);
				bullets.push(b);
				stage.addChild(b);
			}
		}
	}
}

Monster.prototype.causeLoose = function(y){
	if(this.y >= y){
		return true;
	}else{
		return false;
	}
}