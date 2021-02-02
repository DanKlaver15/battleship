"use strict";

const prompt = require("prompt-sync")();
const destroyer = require("./destroyer.js");
const Destroyer = destroyer.Destroyer;
const submarine = require("./submarine.js");
const Submarine = submarine.Submarine;
const battleship = require("./battleship.js");
const Battleship = battleship.Battleship;
const carrier = require("./carrier.js");
const Carrier = carrier.carrier;

/*====================================================================*/

class Game {
	constructor() {
		this.ships = [];

		this.ships.push(new Destroyer());
		this.ships.push(new Submarine());
		this.ships.push(new Battleship());
		this.ships.push(new Carrier());
	}













}