/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   adebray.pong.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abarbaro <abarbaro@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/12/18 00:23:34 by abarbaro          #+#    #+#             */
/*   Updated: 2014/12/18 07:20:41 by abarbaro         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function log(object) {console.log(object);}

function to_unit(x) {
    return (x / (x < 0 ? -x : x));
}

function vec2(x, y) {
    this.x = x;
    this.y = y;
}

function rSign() {
    return (Math.random() < 1/2 ? -1 : 1);
}

function player(number, drawColor, gameBoard)
{
    this.lives = 3;
    this.number = number;
    this.color = drawColor;
    this.w = 8;
    this.h = 32;
    this.x = number % 2 ? gameBoard.width / 16
                        : 15 * (gameBoard.width / 16) - this.w;
    this.y = gameBoard.height / 2 - this.h / 2;
    this.draw = function(ctx)
    {
        var fillStyleOld = ctx.fillStyle;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = fillStyleOld;
    }
}

function ball(drawColor, gameBoard)
{
    this.color = drawColor;
    this.set = function() {
        this.w = 8;
        this.h = 8;
        this.x = gameBoard.width / 2 - this.w / 2;
        this.y = gameBoard.height / 2 - this.h / 2;
        this.velocity = new vec2(/*Math.floor(Math.random() * 3) * rSign()
                                ,Math.floor(Math.random() * 4 + 1 * rSign())*/13, 0);
        // if (this.velocity.x == 0) {
        //     this.velocity.x = 16;
        // }
        // if (this.velocity.y == 0) {
        //     this.velocity.y = 16;
        // }
    }
    this.collide = function(rect)
    {
        // Ball isn't strictly "over" nor "under" rectangle
        // => may hit on the sides
        if (this.y + this.h > rect.y && this.y < rect.y + rect.h)
        {
            // log("Player on my side");
            // Collide left side with right side or opp -> bounce x axis
            // left
            if (this.x < rect.x + rect.w && this.x + this.velocity.x > rect.x
                /* right */
                || this.x + this.w > rect.x && this.x + this.velocity.x < rect.x)
            {
                this.velocity.x *= -1;
                // log("Side collision");
            }
        }
        // Ball is strictly "over" or "under" rectangle
        // => may hit on top / bottom
        if (this.x + this.w > rect.x && this.x < rect.x + rect.w)
        {
            // log("Player on my top/bottom");
            // Collide top side with bottom, or opp -> bounce y axis
            if (this.y < rect.y + rect.h && this.y > rect.y
                || this.y + this.h > rect.y && this.y < rect.y)
            {
                this.velocity.y *= -1;
                // log("Top/bottom collision");
            }
        }
    }
    this.draw = function(ctx)
    {
        var fillStyleOld = ctx.fillStyle;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = fillStyleOld;
    }
    this.update = function(playersArray, gameBoard)
    {
        for (var i = 0; i < playersArray.length; i++) {
            // if (playersArray[i].die(this))
            // {
            //     player.lives --;
            //     this.set();
            // }
        }
        if (this.x < 0 || this.x + this.w > gameBoard.width) {
            this.set();
        }
        else if (this.y < 0 || this.y + this.h > gameBoard.height) {
            this.velocity.y *= -1;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        for (var i = 0; i < playersArray.length; i++) {
            this.collide(playersArray[i]);
        }
    }

    this.set();
}

var pong = {};

pong.init = function()
{
    this.fgColor = "#00ff00";
    this.bgColor = "#000000";
    this.framerate = 50;
    this.gameBoard = document.getElementById('canvas');
    this.ctx = this.gameBoard.getContext('2d');
    this.players = 2;
    this.playersArray = [];
    // event
    this.keyHandler = function(e) {
        e = e || window.event;
        log(e.type);
    }
    window.addEventListener("keydown", this.keyHandler, false);
    window.addEventListener("keyup", this.keyHandler, false);

    for (var i = 1; i <= this.players; i++) {
        this.playersArray.push (new player(i, this.fgColor, this.gameBoard));
    }

    this.palet = new ball(this.fgColor, this.gameBoard);
}

pong.draw = function()
{
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0,0,this.gameBoard.width,this.gameBoard.height);
    this.ctx.fillStyle = this.fgColor;

    // this.p1.draw(this.ctx);
    // this.p2.draw(this.ctx);
    for (var i = 0; i < this.players; i++) {
        this.playersArray[i].draw(this.ctx);
    }
    this.palet.draw(this.ctx);
}

pong.update = function()
{
    // this.p1.update();
    // this.p2.update();
    for (var i = 0; i < this.players; i++) {
        // this.playersArray[i].update();
    }
    // log(this.palet);
    this.palet.update(this.playersArray, this.gameBoard);
}

pong.run = function()
{
    this.update.iter = 0;
    this.intervalId = setInterval(
        function() {
            pong.draw();
            pong.update();
        }
        , 1000 / this.framerate);
}

pong.init();
pong.run();