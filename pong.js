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

function pong() {
  var arcade = document.getElementById('canvas');
  if (arcade.getContext) {
    var ctx = arcade.getContext('2d');

    ctx.fillRect(0,0,arcade.width,arcade.height);
  }
}

pong();