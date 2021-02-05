"use strict";

const prompt = require("prompt-sync")();

const readlineSync = require('readline-sync');
const readline = require('readline');
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
const Color = {
	Reset: "\x1b[0m",
	Bright: "\x1b[1m",
	Dim: "\x1b[2m",
	Underscore: "\x1b[4m",
	Blink: "\x1b[5m",
	Reverse: "\x1b[7m",
	Hidden: "\x1b[8m",
 
	FgBlack: "\x1b[30m",
	FgRed: "\x1b[31m",
	FgGreen: "\x1b[32m",
	FgYellow: "\x1b[33m",
	FgBlue: "\x1b[34m",
	FgMagenta: "\x1b[35m",
	FgCyan: "\x1b[36m",
	FgWhite: "\x1b[37m",
 
	BgBlack: "\x1b[40m",
	BgRed: "\x1b[41m",
	BgGreen: "\x1b[42m",
	BgYellow: "\x1b[43m",
	BgBlue: "\x1b[44m",
	BgMagenta: "\x1b[45m",
	BgCyan: "\x1b[46m",
	BgWhite: "\x1b[47m"
 }

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
		this.playerOne = new Player(prompt(), Color.FgGreen);
		console.log("Player 2, please enter your name.");
		this.playerTwo = new Player(prompt(), Color.FgBlue);
		console.log("Welcome " + this.addColor(Color.FgGreen, this.playerOne.name, Color.Reset) + " and " + this.addColor(Color.FgBlue, this.playerTwo.name, Color.Reset));

		this.displayRules();

		let player1InternalBoard = this.generateGameBoard();
		let player2InternalBoard = this.generateGameBoard();
		let player1ExternalBoard = this.generateGameBoard();
		let player2ExternalBoard = this.generateGameBoard();

		this.placeShip(this.ships[3], this.playerOne, player1InternalBoard);
		this.placeShip(this.ships[2], this.playerOne, player1InternalBoard);
		this.placeShip(this.ships[1], this.playerOne, player1InternalBoard);
		this.placeShip(this.ships[0], this.playerOne, player1InternalBoard);

		this.placeShip(this.ships[3], this.playerTwo, player2InternalBoard);
		this.placeShip(this.ships[2], this.playerTwo, player2InternalBoard);
		this.placeShip(this.ships[1], this.playerTwo, player2InternalBoard);
		this.placeShip(this.ships[0], this.playerTwo, player2InternalBoard);

		this.playRounds(this.playerOne, this.playerTwo, player1ExternalBoard, player2ExternalBoard, player1InternalBoard, player2InternalBoard);

		this.askRepeatGame();

	}

/*======================================================================*/

	displayRules() {
		console.log("Please read the following rules carefuly:")
		console.log(this.addColor(Color.FgGreen, this.playerOne.name, Color.Reset) + " will be given a chance to position his ships on his or her board first. Please keep in mind that ships may no overlap or extend outside the boundry of the board.");
		console.log(this.addColor(Color.FgBlue, this.playerTwo.name, Color.Reset) + " will then also be given a chance to position his or her ships on his board. Please keep in mind that ships may no overlap or extend outside the boundry of the board.");
		console.log("Once both players have had a chance to position their ships, " + this.addColor(Color.FgGreen, this.playerOne.name, Color.Reset) + " will then have the opportunity to choose a location of his or her first shot.");
		console.log(this.addColor(Color.FgBlue, this.playerTwo.name, Color.Reset) + " will then have the same opportunity.");
		console.log("A hit will be marked on the map as an 'X' and a miss will be marked as an '0'");
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
		let spaceRegex = new RegExp(/[A-Z]|[0-9]+/g);
		let nameColor = "";
		if (player.name === this.playerOne.name) {
			nameColor = Color.FgGreen;
		}
		else {
			nameColor = Color.FgBlue;
		}
		let shipLocation = [];
		for (let i = 1; i <= ship.size; i++) {
			console.log(this.addColor(nameColor, player.name, Color.Reset) + ", please choose space #" + i + " for your " + ship.name + " (" + ship.size + " spaces total) using the format 'A1' where the capital letter is the row and the number is the column.");
			let response = this.validateFormat(prompt()).match(spaceRegex);
			let rowIndex = this.findRow(response, board);
			let columnIndex = response[1];
			if (i === 1) {
				while (!this.isFreeSpace(rowIndex, columnIndex, board)) {
					console.log("This space has already been used.  Please choose a different one.");
					response = this.validateFormat(prompt()).match(spaceRegex);
					rowIndex = this.findRow(response, board);
					columnIndex = response[1];
				}
			}
			else if (i === 2) {
				while (!this.isFreeSpace(rowIndex, columnIndex, board) || !this.isSpaceAdjacentToPrevious(shipLocation, response)) {
					console.log("This space is unavailable.  Either it has already been used or it does not form a continuous line with your previous spaces for this ship. Please choose a different one.");
					response = this.validateFormat(prompt()).match(spaceRegex);
					rowIndex = this.findRow(response, board);
					columnIndex = response[1];
				}
			}
			else {
				while (!this.isFreeSpace(rowIndex, columnIndex, board) || !this.isSpaceAdjacentToPrevious(shipLocation, response) || !this.isStraightLine(shipLocation, response)) {
					console.log("This space is unavailable.  Either it has already been used or it does not form a continuous line with your previous spaces for this ship. Please choose a different one.");
					response = this.validateFormat(prompt()).match(spaceRegex);
					rowIndex = this.findRow(response, board);
					columnIndex = response[1];
				}
			}
			shipLocation.push(response);
			board[rowIndex][columnIndex] = "{" + ship.initials + "}";
			console.table(board);
		}
	}

	playRounds (playerOne, playerTwo, player1ExternalBoard, player2ExternalBoard, player1InternalBoard, player2InternalBoard) {
		let spaceRegex = new RegExp(/[A-Z]|[0-9]+/g);
		console.log("All ships have been placed." + "\n");
		
		while (playerOne.score < 4 && playerTwo.score < 4) {
			// player 1 plays
			console.table(player2ExternalBoard);
			console.log(this.addColor(Color.FgGreen, playerOne.name, Color.Reset) + " please select a space to attack.");
			let target = this.validateFormat(prompt()).match(spaceRegex);
			let rowIndex = this.findRow(target, player2InternalBoard);
			let columnIndex = target[1];
			while (player2ExternalBoard[rowIndex][columnIndex] === "[X]" || player2ExternalBoard[rowIndex][columnIndex] === "[0]") {
				console.log("You have already attacked this space.  Please choose a different space.");
				target = this.validateFormat(prompt()).match(spaceRegex);
				rowIndex = this.findRow(target, player2InternalBoard);
				columnIndex = target[1];
			}
			if (player2InternalBoard[rowIndex][columnIndex].includes("{")) {
				player2ExternalBoard[rowIndex][columnIndex] = "[X]";
			}
			else {
				player2ExternalBoard[rowIndex][columnIndex] = "[0]";
			}
			console.table(player2ExternalBoard);
			this.trackScore(player2InternalBoard, rowIndex, columnIndex, playerOne, playerTwo);
			console.log("Current score for " + this.addColor(Color.FgGreen, playerOne.name, Color.Reset) + ": " + playerOne.score);
			this.clearConsole();
			// player 2 plays
			console.table(player1ExternalBoard);
			console.log(this.addColor(Color.FgBlue, playerTwo.name, Color.Reset) + " please select a space to attack.");
			target = this.validateFormat(prompt()).match(spaceRegex);
			rowIndex = this.findRow(target, player1InternalBoard);
			columnIndex = target[1];
			while (player1ExternalBoard[rowIndex][columnIndex] === "[X]" || player1ExternalBoard[rowIndex][columnIndex] === "[0]") {
				console.log("You have already attacked this space.  Please choose a different space.");
				target = this.validateFormat(prompt()).match(spaceRegex);
				rowIndex = this.findRow(target, player1InternalBoard);
				columnIndex = target[1];
			}
			if (player1InternalBoard[rowIndex][columnIndex].includes("{")) {
				player1ExternalBoard[rowIndex][columnIndex] = "[X]";
			}
			else {
				player1ExternalBoard[rowIndex][columnIndex] = "[0]";
			}
			console.table(player1ExternalBoard);
			this.trackScore(player1InternalBoard, rowIndex, columnIndex, playerTwo, playerOne);
			console.log("Current score for " + this.addColor(Color.FgBlue, playerTwo.name, Color.Reset) + ": " + playerTwo.score);
			this.clearConsole();
		}
		if (playerOne.score === 4) {
			console.log(this.addColor(Color.Bright, "Congratulations " + this.addColor(Color.FgGreen, playerOne.name, Color.Reset) + ". You won!") + "\n");
		}
		else if (playerTwo.score === 4) {
			console.log(this.addColor(Color.Bright, "Congratulations " + this.addColor(Color.FgGreen, playerTwo.name, Color.Reset) + ". You won!") + "\n");
		}
	}

	trackScore(internalBoard, rowIndex, columnIndex, currentPlayer, opposingPlayer) {
		switch (internalBoard[rowIndex][columnIndex]) {
			case "{AC}":
				this.ships[3].hits++;
				break;
			case "{B}":
				this.ships[2].hits++;
				break;
			case "{S}":
				this.ships[1].hits++;
				break;
			case "{D}":
				this.ships[0].hits++;
				break;
			default:
				break;
		}
		for (let i = 0; i < this.ships.length; i++) {
			if (this.ships[i].hits === this.ships[i].size) {
				currentPlayer.score++;
				console.log(this.addColor(Color.Bright, "You sunk ", Color.Reset) + this.addColor(Color.Bright + opposingPlayer.color, opposingPlayer.name, Color.Reset) + this.addColor(Color.Bright, "'s " + this.ships[i].name, Color.Reset));
			}
		}
	}

	askRepeatGame() {
		console.log("Would you like to play again? Enter " + this.addColor(Color.FgGreen, "yes", Color.Reset) + " to begin a new game or type " + this.addColor(Color.FgGreen, "exit", Color.Reset) +  " to stop playing.");
		let repeatGame = prompt();
		if (repeatGame.trim().toLowerCase() === 'exit') {
			console.log("Goodbye!");
			return;
		}
		else {
			while (repeatGame.trim().toLowerCase() !== "exit" && repeatGame.toLowerCase().trim() !== "yes") {
				console.log("Your response was invalid. Please enter " + this.addColor(Color.FgGreen, "yes", Color.Reset) + " to begin a new game or type " + this.addColor(Color.FgGreen, "exit", Color.Reset) +  " to stop playing.");
				repeatGame = prompt();
			}
			if (repeatGame.trim().toLowerCase() === "exit") {
				console.log("Goodbye!");
				return;
			}
			else if (repeatGame.toLowerCase().trim() === "yes") {
				let additionalGame = new Game();
				additionalGame.runGame();
			}
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
			if ((Math.abs(array[i][0].charCodeAt(0) - response[0].charCodeAt(0)) === 1 && array[i][1] == response[1]) || (Math.abs(array[i][1] - response[1]) == 1 && array[i][0].charCodeAt(0) === response[0].charCodeAt(0))) {
				result = true;
			}
			else {
				result = false;
			}
		}
		return result;
	}

	isStraightLine(array, response) {
		let orientation = "";
		if (array[0][0] === array[1][0]) {
			orientation = "horizontal";
		}
		else if (array[0][0] !== array[1][0]) {
			orientation = "vertical";
		}
		if ((orientation = "horizontal" && response[0] === array[0][0]) || (orientation = "vertical" && response[1] === array[0][1])) {
			return true;
		}
		else {
			return false;
		}
	}

	validateFormat(space) {
		let regex = new RegExp(/^[A-T]([1-9]|[1][0-9]|[2][0])$/);
		while (!regex.test(space)) {
			console.log("Your entry is invalid.  Please choose a space that begins with a capital letter A-T followed by a number 1-20.");
			space = prompt();
		}
		return space;
	}

	addColor(color, str, reset) {
		return (color + str + reset);
	}

	clearConsole() {
		readlineSync.question("When you are finished reviewing the board, please hit enter to clear the console so the next player can play.", {hideEchoBack: true, mask: ''});
		process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
	}
}

/*====================================================================*/

module.exports = {
   Game: Game
}