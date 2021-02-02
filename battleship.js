"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Battleship extends Ship {
	constructor() {
		this.spaceSize = 4;
	}
}

/*======================================================================*/

module.exports = {
   Battleship: Battleship
}
