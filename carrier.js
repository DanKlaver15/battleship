"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Carrier extends Ship {
	constructor(name) {
		super(name);
		this.spaceSize = 5;
	}
}

/*======================================================================*/

module.exports = {
   Carrier: Carrier
}
