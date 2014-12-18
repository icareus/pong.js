// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   pong.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: abarbaro <marvin@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2014/12/15 17:27:22 by abarbaro          #+#    #+#             //
//   Updated: 2014/12/15 17:27:25 by abarbaro         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

function log(object) {console.log(object);}

var player = function(rgb)
{
	this.w = 8;
	this.h = 32;
	this.color = rgb;
}

var ball = function(rgb)
{
	this.w = 8;
	this.h = 8;
	this.color = rgb;
}

var pong = {};

pong.fgColor = "#0eff00";
pong.bgColor = "#000000";
pong.framerate = 60;
pong.arcade = document.getElementById('canvas');

pong.init = function()
{
	this.p1 = new player(this.fgColor);
	this.p1.x = this.arcade.width / 16;
	this.p1.y = this.arcade.height / 2 - this.p1.h / 2;
	this.p2 = new player(this.fgColor);
	this.p2.x = 15 * (this.arcade.width / 16) - this.p2.w;
	this.p2.y = this.arcade.height / 2 - this.p2.h / 2;
	this.palet = new ball(this.fgColor);
	this.palet.x = this.arcade.width / 2 - this.palet.w / 2;
	this.palet.y = this.arcade.height / 2 - this.palet.h / 2;
	this.palet.velocity = {};
	this.palet.velocity.x = (Math.random() < 0,5 ? -1 : 1);

	this.ctx = this.arcade.getContext('2d');
}

pong.draw = function()
{
	this.ctx.fillStyle = this.bgColor;
	this.ctx.fillRect(0,0,this.arcade.width,this.arcade.height);
	this.ctx.fillStyle = this.fgColor;
	this.ctx.fillRect(this.p1.x, this.p1.y, this.p1.w, this.p1.h);
	this.ctx.fillRect(this.p2.x, this.p2.y, this.p2.w, this.p2.h);
	this.ctx.fillRect(this.palet.x, this.palet.y, this.palet.w, this.palet.h);
}

pong.update = function()
{
	log(KeyboardEvent.KEYDOWN);
	if (this.palet.x < this.p1.x + this.p1.w) {
		this.palet.velocity.x = 1;}
	else if (this.palet.x > this.p2.x - this.palet.w) {
		this.palet.velocity.x = -1;
	}
	this.palet.x += this.palet.velocity.x;
	log(this.palet.velocity);
}

pong.run = function()
{
	pong.update.iter = 0;
	pong.intervalId = setInterval(function()
		{
			pong.draw(pong.ctx);
			pong.update();
		}, 1000 / pong.framerate);
}

pong.init();
pong.run();