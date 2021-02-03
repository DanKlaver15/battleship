"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Battleship extends Ship {
	constructor() {
		super(length, name);
		this.name = "Battleship";
		this.length = 4;
	}
}

/*======================================================================*/

module.exports = {
   Battleship: Battleship
}
