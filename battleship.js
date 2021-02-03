"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Battleship extends Ship {
	constructor(name, size) {
		super(name, size);
	}
}

/*======================================================================*/

module.exports = {
   Battleship: Battleship
}
