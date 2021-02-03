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

		this.ships.push(new Destroyer("Destroyer", 2));	// this.ships[3]
		this.ships.push(new Submarine("Submarine", 3));	// this.ships[3]
		this.ships.push(new Battleship("Battleship", 4));	// this.ships[3]
		this.ships.push(new Carrier("Aircraft Carrier", 5));	// this.ships[3]
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
		return;
		this.placeShip(this.ships[2], this.playerOne, player1Board);
		this.placeShip(this.ships[1], this.playerOne, player1Board);
		this.placeShip(this.ships[0], this.playerOne, player1Board);

		// console.log(player1Board);
		// return;

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
		let shipInitials = ["AC" + "B" + "S" + "D"];
		for (let i = 1; i <= ship.size; i ++) {
			console.log(player.name + " please choose space #" + i + " for your " + ship.name + " (" + ship.size + " spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
			let response = this.validateFormat(prompt()).split("");
			let rowIndex = 0;
			let columnIndex = 0;
			for (let i = 0; i < board.length; i++) {
				if (board[i][0] === response[0]) {
					rowIndex = i;
				}
			}
			for (let i = 1; i < board[rowIndex].length; i++) {
				if (board[rowIndex][i] === response[1]) {
					columnIndex = i;
				}
			}
			while (!this.isFreeSpace(rowIndex, columnIndex, board)) {
				console.log("This space is unavailable.  Please choose a different one.");
				response = this.validateFormat(prompt()).split("");
			}
			board[rowIndex][columnIndex] = "{}";
		}
	}

	isFreeSpace(rowIndex, columnIndex, board) {
		if (board[rowIndex][columnIndex] !== "{}") {
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