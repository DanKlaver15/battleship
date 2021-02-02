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
		console.log("Welcome to the game of Battleship!");
		console.log("Player 1, please enter your name.");
		this.playerOne = new Player(prompt());
		console.log("Player 2, please enter your name.");
		this.playerTwo = new Player(prompt());
		console.log("Welcome " + this.playerOne.name + " and " + this.playerTwo.name);

		this.displayRules();

		console.table(this.generateGameBoard());
		let player1Board = this.generateGameBoard();
		let player2Board = this.generateGameBoard();

		let player1Carrier = this.placeCarrier(this.playerOne);
		let player1Battleship = this.placeBattleship(this.playerOne);
		let player1Submarine = this.placeSubmarine(this.playerOne);
		let player1Destroyer = this.placeDestroyer(this.playerOne);

		let player2Carrier = this.placeCarrier(this.playerTwo);
		let player2Battleship = this.placeBattleship(this.playerTwo);
		let player2Submarine = this.placeSubmarine(this.playerTwo);
		let player2Destroyer = this.placeDestroyer(this.playerTwo);

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
		let columns = 20;

		for (let c = 1; c <= columns; c++) {
			let beginningChar = 65;
			for (let r = 0; r < rows; r++) {
				gameBoard.push([String.fromCharCode(beginningChar), c]);
				beginningChar++;
			}
		}
		return gameBoard;
	}

	placeCarrier(player) {
		let carrierLocation = [];
		console.log(player.name + " please choose the first space for your AIRCRAFT CARRIER(5 spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
		carrierLocation.push(this.validateSpace(prompt()));
		return carrierLocation;
	}

	placeBattleship(player) {
		let battleshipLocation = [];
		console.log(player.name + " please choose the first space for your BATTLESHIP(4 spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
		battleshipLocation.push(this.validateSpace(prompt()));
		return battleshipLocation;
	}

	placeSubmarine(player) {
		let submarineLocation = [];
		console.log(player.name + " please choose the first space for your SUBMARINE(3 spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
		submarineLocation.push(this.validateSpace(prompt()));
		return submarineLocation;
	}

	placeDestroyer(player) {
		let destroyerLocation = [];
		console.log(player.name + " please choose the first space for your DESTROYER(2 spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
		destroyerLocation.push(this.validateSpace(prompt()));
		return destroyerLocation;
	}

	validateSpace(space) {
		let regex = new RegExp(/^[A-T]([1-9]|[1][1-9]|[2][0])$/);
		while (!regex.test(space)) {
			console.log("Your entry is invalid.  Please choose a space that begins with a capital letter A-T followed by a number 1-20.");
			space = prompt().split("");
		}
		return space;
	}

}

/*====================================================================*/

module.exports = {
   Game: Game
}