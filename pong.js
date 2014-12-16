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

var player = function()
{
	var w = 8;
	var h = 32;
	var x;
	var y;
}

player.prototype.draw = function(ctx){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
}

function pong() {
	var fgColor = 0x0eff00;
	var bgColor = 0x000000;
	var gamestatus = 0;
	var arcade = document.getElementById('canvas');
	var p1 = new player;
	p1.x = arcade.width / 16;
	p1.y = arcade.height / 2 - p1.h / 2;
	var p2 = new player;
	p2.x = 15 * (arcade.width / 16) - p2.w;
	p2.y = arcade.height / 2 - p2.h / 2;

	if (arcade.getContext) {
		var ctx = arcade.getContext('2d');
		ctx.fillRect(0,0,arcade.width,arcade.height);
	}
	p1.draw(ctx);
	p2.draw(ctx);
}

pong();