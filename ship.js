"use strict";

class Ship {
	constructor(name, initials, size, hits) {
		this.name = name;
		this.initials = initials;
		this.size = size;
		this.hits = 0;
	}
}

/*======================================================================*/

module.exports = {
   Ship: Ship
}
