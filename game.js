"use strict";

const prompt = require("prompt-sync")();
const player = require("./player.js");
const Player = player.Player;
const destroyer = require("./destroyer.js");
const Destroyer = destroyer.Destroyer;
const submarine = require("./submarine.js");
const Submarine = submarine.Submarine;
const battleship = require("./battleship.js");
const Battleship = battleship.Battleship;
const carrier = require("./carrier.js");
const Carrier = carrier.Carrier;

/*====================================================================*/

class Game {
	constructor() {
		this.ships = [];

		this.ships.push(new Destroyer());
		this.ships.push(new Submarine());
		this.ships.push(new Battleship());
		this.ships.push(new Carrier());
	}

	runGame() {

	}

	displayRules() {
		console.log("Welcome to the game of Battleship!");
		console.log("")
	}









}

/*====================================================================*/

module.exports = {
   Game: Game
}