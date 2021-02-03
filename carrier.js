"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Carrier extends Ship {
	constructor(name, size) {
		super(name, size);
	}
}

/*======================================================================*/

module.exports = {
   Carrier: Carrier
}
