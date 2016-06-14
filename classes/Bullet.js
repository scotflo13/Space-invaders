function Bullet(src, x,y, vY) {
	this.initialize(src, x,y, vY);
}

Bullet.prototype = new createjs.Bitmap();
Bullet.prototype.vY;

Bullet.prototype.initialize = function(src, x,y, vY){
	this.image = src;
	this.x = x;
	this.y = y;
	this.vY = vY;
}

Bullet.prototype.tick = function(){
	this.y += this.vY;
	if(this.y < 0 || this.y > 500){
		bullets.splice(bullets.indexOf(this), 1);
		stage.removeChild(this);
	}else{
		for(monster in monsters){
			var m = monsters[monster];
			if(this.canHit(m)){
				monsters.splice(monsters.indexOf(m), 1);
				stage.removeChild(m);  
				bullets.splice(bullets.indexOf(this), 1);
				stage.removeChild(this);
				score += 10;
				changeScore();
			}
		}
	}
}

Bullet.prototype.canHit = function(obj){
	if(this.x >= obj.x - 20 && this.x <= obj.x + 15 && this.y >= obj.y && this.y <= obj.y + 10){
		return true;
	}else{
		return false;
	}
}

Bullet.prototype.causeLoose = function(){
	if(this.y == gamer.y){
		if(this.x >= gamer.x && this.x <= gamer.x + 40){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}