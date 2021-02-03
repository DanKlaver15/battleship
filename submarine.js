"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Submarine extends Ship {
	constructor(name, size) {
		super(name, size);
	}
}

/*======================================================================*/

module.exports = {
   Submarine: Submarine
}
