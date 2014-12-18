/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abarbaro <abarbaro@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/12/18 00:23:34 by abarbaro          #+#    #+#             */
/*   Updated: 2014/12/18 08:31:57 by abarbaro         ###   ########.fr       */
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
    if (this.number == 1) {
        this.up = "U+0057";
        this.down = "U+0053";
    }
    else if (this.number == 2)
    {
        this.up = "Up";
        this.down = "Down";
    }
    this.controller = function() {
        var up = false;
        var down = false;
    }
    this.velocity = new vec2(0, 0);
    this.draw = function(ctx)
    {
        var fillStyleOld = ctx.fillStyle;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = fillStyleOld;
    }
    this.update = function(gameBoard) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.y = this.y + this.h > gameBoard.height ? gameBoard.height - this.h : this.y;
        this.y = this.y < 0 ? 0 : this.y;
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
        this.velocity = new vec2(Math.round(Math.random() * 8 * rSign()) || rSign(),
                                Math.round(Math.random() * 8 * rSign()) || rSign());
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
            if (this.x < rect.x + rect.w && this.x + this.velocity.x > rect.x
                /* right */
                || this.x + this.w > rect.x && this.x + this.velocity.x < rect.x)
            {
                this.velocity.x *= -1;
            }
        }
        // Ball is strictly "over" or "under" rectangle
        // => may hit on top / bottom
        if (this.x + this.w > rect.x && this.x < rect.x + rect.w)
        {
            if (this.y < rect.y + rect.h && this.y > rect.y
                || this.y + this.h > rect.y && this.y < rect.y)
            {
                this.velocity.y *= -1;
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

    for (var i = 1; i <= this.players; i++) {
        this.playersArray.push (new player(i, this.fgColor, this.gameBoard));
    }
    // event
    window.addEventListener("keydown", function(e) {
        e = e || window.event;
        for (i = 0; i < pong.playersArray.length; i++) {
            if (pong.playersArray[i].up == e.keyIdentifier) {
                pong.playersArray[i].velocity.y = pong.playersArray[i].velocity.y == 4 ? 0 : -4;
            }
            if (pong.playersArray[i].down == e.keyIdentifier) {
                pong.playersArray[i].velocity.y = pong.playersArray[i].velocity.y == -4 ? 0 : 4;
            }
        }
        log(e.type + " : " + e.keyIdentifier);
    }, false);
    window.addEventListener("keyup", function(e) {
        e = e || window.event;
        for (i = 0; i < pong.playersArray.length; i++) {
            if (pong.playersArray[i].up == e.keyIdentifier) {
                pong.playersArray[i].velocity.y = pong.playersArray[i].velocity.y == -4 ? 0 : 4;
            }
            if (pong.playersArray[i].down == e.keyIdentifier) {
                pong.playersArray[i].velocity.y = pong.playersArray[i].velocity.y == 4 ? 0 : -4;
            }
        }
        log(e.type + " : " + e.keyIdentifier);
    }, false);

    this.palet = new ball(this.fgColor, this.gameBoard);
}

pong.draw = function()
{
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0,0,this.gameBoard.width,this.gameBoard.height);
    this.ctx.fillStyle = this.fgColor;

    for (var i = 0; i < this.players; i++) {
        this.playersArray[i].draw(this.ctx);
    }
    this.palet.draw(this.ctx);
}

pong.update = function()
{
    for (var i = 0; i < this.players; i++) {
        this.playersArray[i].update(this.gameBoard);
    }
    //log(this);
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