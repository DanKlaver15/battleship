"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Submarine extends Ship {
	constructor() {
		this.spaceSize = 3;
	}
}

/*======================================================================*/

module.exports = {
   Submarine: Submarine
}
