"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Destroyer extends Ship {
	constructor(spaceSize) {
		super(spaceSize);
		this.spaceSize = 2;
	}
}

/*======================================================================*/

module.exports = {
   Destroyer: Destroyer
}
