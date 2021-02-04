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

		this.ships.push(new Destroyer("Destroyer", "D", 2));	// this.ships[0]
		this.ships.push(new Submarine("Submarine", "S", 3));	// this.ships[1]
		this.ships.push(new Battleship("Battleship", "B", 4));	// this.ships[2]
		this.ships.push(new Carrier("Aircraft Carrier", "AC", 5));	// this.ships[3]
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

		this.placeShip(this.ships[3], this.playerOne, player1Board);
		console.table(player1Board);
		this.placeShip(this.ships[2], this.playerOne, player1Board);
		console.table(player1Board);
		this.placeShip(this.ships[1], this.playerOne, player1Board);
		console.table(player1Board);
		this.placeShip(this.ships[0], this.playerOne, player1Board);
		console.table(player1Board);
		return;

		this.placeShip(this.ships[3], this.playerTwo, player2Board);
		this.placeShip(this.ships[2], this.playerTwo, player2Board);
		this.placeShip(this.ships[1], this.playerTwo, player2Board);
		this.placeShip(this.ships[0], this.playerTwo, player2Board);

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
		for (let r = 0; r < gameBoard[r]; r++) {
			for (let c = 1; c <= gameBoard[r][c]; c++) {
				gameBoard[r][c] = parseInt(gameBoard[r][c]);
			}
		}
		return gameBoard;
	}

	// displayGameBoard(board) {
	// 	let rows = 20;
	// 	let columns = 20;
	// 	let beginningChar = 65;

	// 	for (let r = 0; r < rows; r++) {
	// 			console.log(JSON.stringify(board));
	// 		beginningChar++;
	// 	}
	// }

	placeShip(ship, player, board) {
		let shipLocation = [];
		for (let i = 1; i <= ship.size; i++) {
			console.log(player.name + " please choose space #" + i + " for your " + ship.name + " (" + ship.size + " spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
			let response = this.validateFormat(prompt()).split("");
			let rowIndex = this.findRow(response, board);
			let columnIndex = this.findColumn(response, rowIndex, board);
			console.log(i, response, rowIndex, columnIndex, shipLocation, ship, ship.size);	// only for testing
			if (i === 1) {
				while (!this.isFreeSpace(rowIndex, columnIndex, board)) {
					console.log("This space is unavailable.  Please choose a different one.");
					response = this.validateFormat(prompt()).split("");
					rowIndex = this.findRow(response, board);
					columnIndex = this.findColumn(response, rowIndex, board);
				}
			}
			else if (i > 1) {
				while (!this.isFreeSpace(rowIndex, columnIndex, board) && !this.isSpaceAdjacentToPrevious(shipLocation, response)) {
					console.log("This space is unavailable.  Either it has already been used or it does not form a continuous line with your previous spaces for this ship. Please choose a different one.");
					response = this.validateFormat(prompt()).split("");
					rowIndex = this.findRow(response, board);
					columnIndex = this.findColumn(response, rowIndex, board);
				}
			}
			shipLocation.push(response);
			board[rowIndex][columnIndex] = "{" + ship.initials + "}";
		}
	}

	findRow(response, board) {
		for (let r = 0; r < board.length; r++) {
			if (board[r][0] === response[0]) {
				let rowIndex = r;
				return rowIndex;
			}
		}
	}

	findColumn(response, rowIndex, board) {
		for (let c = 1; c <= board[rowIndex].length; c++) {
			if (board[rowIndex][c] === response[1]) {
				let columnIndex = c;
				return columnIndex
			}
		}
	}

	isFreeSpace(rowIndex, columnIndex, board) {
		if (!board[rowIndex][columnIndex].includes("{")) {
			return true;
		}
		else {
			return false;
		}
	}

	isSpaceAdjacentToPrevious(array, response) {
			let result = false;
			for (let i = 0; (i < array.length && result === false); i++) {
				if ((Math.abs(array[i][0].charCodeAt(0) - response[0].charCodeAt(0)) === 1 && array[i][1] === response[1]) || (Math.abs(array[i][1] - response[1]) === 1 && array[i][0].charCodeAt(0) === response[0].charCodeAt(0))) {
					result = true;
				}
				else {
					result = false;
				}
			}
			return result;
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