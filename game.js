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

		let player1Board = this.generateGameBoard();
		let player2Board = this.generateGameBoard();
		this.displayGameBoard(player1Board);

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
		console.log("Once both players have had a chance to position their ships, " + this.playerOne.name + " will then have the opportunity to choose a location of his or her first shot.");
		console.log(this.playerTwo.name + " will then have the same opportunity.");
		console.log("A hit will be marked on the map as an 'X' and a miss will be marked as an 'O'");
		console.log("The game will continue as such until one of the players has sunk all of his or her opponent's ships.");
		console.log("The first player to sink all of his or her opponent's ships is the winner.");
	}

	generateGameBoard() {
		let gameBoard = [];
		let rowArray = [];
		let numRows = 20;
		let numColumns = 20;
		let beginningChar = 65;

		for (let r = 0; r < numRows; r++) {
			let boardRow = String.fromCharCode(beginningChar);
			let boardColumns = "";
			for (let c = 1; c <= numColumns; c++) {
				let columnsDelimited = "";
				if (c < numColumns) {
					columnsDelimited = c + ",";
				}
				else {
					columnsDelimited = c;
				}
				boardColumns += columnsDelimited; 
			}
			rowArray = (boardRow + "," + boardColumns).split(",");
			gameBoard.push(rowArray)
			beginningChar++;
		}
		return gameBoard;
	}

	displayGameBoard(board) {
		let rows = 20;
		let columns = 20;
		let beginningChar = 65;

		for (let r = 0; r < rows; r++) {
				console.log(JSON.stringify(board));
			beginningChar++;
		}
	}

	placeShip(ship, player, board) {
		for (let i = 1; i <= ship.length; i ++) {
			console.log(player.name + " please choose space #" + i + " for your " + ship.name + " (" + ship.length + " spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
			let response = this.validateFormat(prompt()).split("");
			while (!this.isFreeSpace(response, board)) {
				console.log("This space is unavailable.  Please choose a different one.");
				response = this.validateFormat(prompt()).split("");
			}
		}
	}

	placeCarrier(player) {
		console.log(player.name + " please choose the first space for your AIRCRAFT CARRIER(5 spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
		let spaceOne = this.validateFormat(prompt()).split("");
		console.log("Please choose the second space for your AIRCRAFT CARRIER(5 spaces total) using the format 'A1'.");
		let spaceTwo = this.validateFormat(prompt()).split("");
		while (spaceOne === spaceTwo) {
			console.log("This space has already been used.  Please choose another space.");
			spaceTwo = this.validateFormat(prompt()).split("");
		}
		console.log("Please choose the third space for your AIRCRAFT CARRIER(5 spaces total) using the format 'A1'.");
		let spaceThree = this.validateFormat(prompt()).split("");
		while (spaceOne === spaceTwo) {
			console.log("This space has already been used.  Please choose another space.");
			spaceThree = this.validateFormat(prompt()).split("");
		}
		console.log("Please choose the fourth space for your AIRCRAFT CARRIER(5 spaces total) using the format 'A1'.");
		let spaceFour = this.validateFormat(prompt()).split("");
		while (spaceOne === spaceTwo) {
			console.log("This space has already been used.  Please choose another space.");
			spaceFour = this.validateFormat(prompt()).split("");
		}
		console.log("Please choose the fifth space for your AIRCRAFT CARRIER(5 spaces total) using the format 'A1'.");
		let spaceFive = this.validateFormat(prompt()).split("");
		while (spaceOne === spaceTwo) {
			console.log("This space has already been used.  Please choose another space.");
			spaceFive = this.validateFormat(prompt()).split("");
		}


		return carrierLocation;
	}

	placeBattleship(player, board) {
		let spacesUsed = 0;
		console.log(player.name + " please choose the first space for your BATTLESHIP(4 spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
		let battleshipLocation = this.validateFormat(prompt()).split("");


		return battleshipLocation;
	}

	placeSubmarine(player, board) {
		let spacesUsed = 0;
		console.log(player.name + " please choose the first space for your SUBMARINE(3 spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
		let submarineLocation = this.validateFormat(prompt()).split("");


		return submarineLocation;
	}

	placeDestroyer(player, board) {
		let spacesUsed = 0;
		console.log(player.name + " please choose the first space for your DESTROYER(2 spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
		let destroyerLocation = this.validateFormat(prompt()).split("");


		return destroyerLocation;
	}

	isFreeSpace(response, board) {
		let rowIndex = board.indexOf(response[0]);
		let columnIndex = board.indexOf(response[1]);
		if (board[rowIndex][columnIndex] !== "X" || board[rowIndex][columnIndex] !== "O") {
			return true;
		}
		else {
			return false;
		}
	}

	validateFormat(space) {
		let regex = new RegExp(/^[A-T]([1-9]|[1][1-9]|[2][0])$/);
		while (!regex.test(space)) {
			console.log("Your entry is invalid.  Please choose a space that begins with a capital letter A-T followed by a number 1-20.");
			space = prompt();
		}
		return space;
	}

}

/*====================================================================*/

module.exports = {
   Game: Game
}