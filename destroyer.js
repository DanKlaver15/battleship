"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Destroyer extends Ship {
	constructor() {
		this.spaceSize = 2;
	}
}

/*======================================================================*/

module.exports = {
   Destroyer: Destroyer
}
