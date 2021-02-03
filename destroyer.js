"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Destroyer extends Ship {
	constructor(name, initials, size) {
		super(name, initials, size);
	}
}

/*======================================================================*/

module.exports = {
   Destroyer: Destroyer
}
