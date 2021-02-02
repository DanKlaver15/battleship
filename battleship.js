"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Battleship extends Ship {
	constructor(name) {
		super(name);
		this.spaceSize = 4;
	}
}

/*======================================================================*/

module.exports = {
   Battleship: Battleship
}
