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

function draw(ctx)
{
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.w, this.h);
}

var player = function(rgb)
{
	this.w = 8;
	this.h = 32;
	this.color = rgb;
	this.draw = draw;
}

var ball = function(rgb)
{
	this.w = 8;
	this.h = 8;
	this.color = rgb;
	this.draw = draw;
}

function refresh(p1, p2, palet, ctx)
{
	p1.draw(ctx);
	p2.draw(ctx);
	palet.draw(ctx);
}

function gameObject ()
{
	var fps;
	var score = 0;
	// if (game == 'new')
	log(this);
	log(score ++);
}

function pong() {
	var fgColor = "#0eff00";
	var bgColor = "#000000";
	var arcade = document.getElementById('canvas');
	var intervalId;

	var p1 = new player(fgColor);
	p1.x = arcade.width / 16;
	p1.y = arcade.height / 2 - p1.h / 2;
	var p2 = new player(fgColor);
	p2.x = 15 * (arcade.width / 16) - p2.w;
	p2.y = arcade.height / 2 - p2.h / 2;
	var palet = new ball(fgColor);
	palet.x = arcade.width / 2 - palet.w / 2;
	palet.y = arcade.height / 2 - palet.h / 2;

	if (arcade.getContext) {
		var ctx = arcade.getContext('2d');
		ctx.fillStyle = bgColor;
		ctx.fillRect(0,0,arcade.width,arcade.height);
	}
	gameObject.intervalId = setInterval(gameObject, 20);
	refresh(p1, p2, palet, ctx);
}

pong();