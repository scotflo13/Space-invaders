function Player(src, x,y) {
	this.initialize(src, x,y);
}

Player.prototype = new createjs.Bitmap();
Player.prototype.vX = 10;
Player.prototype.minX;
Player.prototype.maxX;
Player.prototype.scaleX = 0.8;
Player.prototype.scaleY = 0.8;
Player.prototype.vcode = 0;
Player.prototype.KEY_RIGHT = 39;
Player.prototype.KEY_LEFT = 37;
Player.prototype.KEY_SPACE = 32;
Player.prototype.FIREWAITTIME = 20;
Player.prototype.CURRENTFIRETIME = 20;

Player.prototype.initialize = function(src, x,y){
	this.image = src;
	this.x = x;
	this.y = y;
	this.minX = 20;
	this.maxX = canvas.width - 70;
}

Player.prototype.tick = function(){
	if(this.CURRENTFIRETIME < this.FIREWAITTIME){
		this.CURRENTFIRETIME++;
	}

	if(this.vcode != 0){
		switch(this.vcode){
			case this.KEY_RIGHT:
				if(this.x <= this.maxX){
					this.x += this.vX;
				}
			break;
			
			case this.KEY_LEFT:
				if(this.x >= this.minX){
					this.x -= this.vX;
				}
			break;
			
			case this.KEY_SPACE:	
				if(this.CURRENTFIRETIME == this.FIREWAITTIME){
					this.CURRENTFIRETIME = 0;
					var b = new Bullet(imgBullet, this.x + 24,this.y - 10, -5);
					bullets.push(b);
					stage.addChild(b);
				}
			break;
		}
		this.vcode = 0;
	}
}