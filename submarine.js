"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Submarine extends Ship {
	constructor(spaceSize) {
		super(spaceSize);
		this.spaceSize = 3;
	}
}

/*======================================================================*/

module.exports = {
   Submarine: Submarine
}
