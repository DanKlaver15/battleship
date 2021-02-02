"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Carrier extends Ship {
	constructor(spaceSize) {
		super(spaceSize);
		this.spaceSize = 5;
	}
}

/*======================================================================*/

module.exports = {
   Carrier: Carrier
}
