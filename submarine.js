"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Submarine extends Ship {
	constructor(name, initials, size) {
		super(name, initials, size);
		this.hits = 0;
	}
}

/*======================================================================*/

module.exports = {
   Submarine: Submarine
}
