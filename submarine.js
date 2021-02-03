"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Submarine extends Ship {
	constructor() {
		super(length, name);
		this.name = "Submarine";
		this.length = 3;
	}
}

/*======================================================================*/

module.exports = {
   Submarine: Submarine
}
