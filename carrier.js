"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Carrier extends Ship {
	constructor(name, initials, size) {
		super(name, initials, size);
	}
}

/*======================================================================*/

module.exports = {
   Carrier: Carrier
}
