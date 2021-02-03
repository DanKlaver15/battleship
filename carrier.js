"use strict";

const ship = require("./ship.js");
const Ship = ship.Ship;

class Carrier extends Ship {
	constructor() {
		super(length, name);
		this.name = "Aircraft Carrier";
		this.length = 5;
	}
}

/*======================================================================*/

module.exports = {
   Carrier: Carrier
}
