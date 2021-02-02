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
		this.playerAdd();

		this.displayRules();

		console.log(this.generateGameBoard());

	}

	playerAdd() {
		console.log("Welcome to the game of Battleship!");
		console.log("Player 1, please enter your name.");
		this.playerOne = new Player(prompt());
		console.log("Player 2, please enter your name.");
		this.playerTwo = new Player(prompt());
		console.log("Welcome " + this.playerOne.name + "and " + this.playerTwo.name);
	}

	displayRules() {
		console.log("Please read the following rules carefuly:")
		console.log(this.playerOne.name + " will be given a chance to position his ships on his or her board first. Please keep in mind that ships may no overlap or extend outside the boundry of the board.");
		console.log(this.playerTwo.name + " will then also be given a chance to position his or her ships on his board. Please keep in mind that ships may no overlap or extend outside the boundry of the board.");
		console.log("Once both players have had a chance to position their ships, " + this.playerOne.name + " will then have the opportunity to choose a row followed by a column for the location of his or her first shot.");
		console.log(this.playerTwo.name + " will then have the same opportunity.");
		console.log("The game will continue as such until one of the players has sunk all of his or her opponent's ships.");
		console.log("The first player to sink all of his or her opponent's ships is the winner.");
	}

	generateGameBoard() {
		let gameBoard = [];
		let rows = 20;
		let rowID = "";
		let columns = 20;
		let columnID = 1;

		for (let c = 1; c <= columns; c++) {
			let beginningChar = 65;
			for (let r = 0; r < rows; r++) {
				gameBoard.push([String.fromCharCode(beginningChar), c]);
				beginningChar++;
			}
		}
		return gameBoard;
	}







}

/*====================================================================*/

module.exports = {
   Game: Game
}