"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Destroyer extends Ship {
	constructor() {
		super(length, name);
		this.name = "Destroyer";
		this.length = 2;
	}
}

/*======================================================================*/

module.exports = {
   Destroyer: Destroyer
}
