"use strict";

const prompt = require("prompt-sync")();
const readlineSync = require('readline-sync');
const {table, getBorderCharacters} = require('table');

/*======================================================================*/

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
		this.ships1 = [];
		this.ships2 = [];

		this.ships1.push(new Destroyer("Destroyer", "{D}", 2));	// this.ships[0]
		this.ships1.push(new Submarine("Submarine", "{S}", 3));	// this.ships[1]
		this.ships1.push(new Battleship("Battleship", "{B}", 4));	// this.ships[2]
		this.ships1.push(new Carrier("Aircraft Carrier", "{AC}", 5));	// this.ships[3]

		this.ships2.push(new Destroyer("Destroyer", "{D}", 2));	// this.ships[0]
		this.ships2.push(new Submarine("Submarine", "{S}", 3));	// this.ships[1]
		this.ships2.push(new Battleship("Battleship", "{B}", 4));	// this.ships[2]
		this.ships2.push(new Carrier("Aircraft Carrier", "{AC}", 5));	// this.ships[3]
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

		// Literal values only here for testing
		// player1InternalBoard[0][1] = "{AC}";
		// player1InternalBoard[0][2] = "{AC}";
		// player1InternalBoard[0][3] = "{AC}";
		// player1InternalBoard[0][4] = "{AC}";
		// player1InternalBoard[0][5] = "{AC}";
		// player1InternalBoard[0][6] = "{B}";
		// player1InternalBoard[0][7] = "{B}";
		// player1InternalBoard[0][8] = "{B}";
		// player1InternalBoard[0][9] = "{B}";
		// player1InternalBoard[0][10] = "{S}";
		// player1InternalBoard[0][11] = "{S}";
		// player1InternalBoard[0][12] = "{S}";
		// player1InternalBoard[0][13] = "{D}";
		// player1InternalBoard[0][14] = "{D}";

		// player2InternalBoard[1][1] = "{AC}";
		// player2InternalBoard[1][2] = "{AC}";
		// player2InternalBoard[1][3] = "{AC}";
		// player2InternalBoard[1][4] = "{AC}";
		// player2InternalBoard[1][5] = "{AC}";
		// player2InternalBoard[1][6] = "{B}";
		// player2InternalBoard[1][7] = "{B}";
		// player2InternalBoard[1][8] = "{B}";
		// player2InternalBoard[1][9] = "{B}";
		// player2InternalBoard[1][10] = "{S}";
		// player2InternalBoard[1][11] = "{S}";
		// player2InternalBoard[1][12] = "{S}";
		// player2InternalBoard[1][13] = "{D}";
		// player2InternalBoard[1][14] = "{D}";

		this.placeShip(this.ships1[3], this.playerOne, player1InternalBoard);
		this.placeShip(this.ships1[2], this.playerOne, player1InternalBoard);
		this.placeShip(this.ships1[1], this.playerOne, player1InternalBoard);
		this.placeShip(this.ships1[0], this.playerOne, player1InternalBoard);
		this.clearConsole();
		this.placeShip(this.ships2[3], this.playerTwo, player2InternalBoard);
		this.placeShip(this.ships2[2], this.playerTwo, player2InternalBoard);
		this.placeShip(this.ships2[1], this.playerTwo, player2InternalBoard);
		this.placeShip(this.ships2[0], this.playerTwo, player2InternalBoard);
		this.clearConsole();

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
		readlineSync.question('Hit Enter key to continue.', {hideEchoBack: true, mask: ''});
	}

	generateGameBoard() {	// This is just a console.table display of the board created.  It shows indeces for each row/column
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
			gameBoard.push(rowArray);
			beginningChar++;
		}
		for (let r = 0; r < gameBoard[r]; r++) {
			for (let c = 1; c <= gameBoard[r][c]; c++) {
				gameBoard[r][c] = parseInt(gameBoard[r][c]);
			}
		}
		return gameBoard;
	}

	drawGameBoard(board) {
		let config, output;
		config = {
			border: getBorderCharacters(`honeywell`),
    		columnDefault: {
				width: 5,
				alignment: 'center'
    		}
		};

		output = table(board, config);
		console.log(output);
	}

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
		this.drawGameBoard(board);
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
			board[rowIndex][columnIndex] = this.addColor(Color.BgCyan + Color.FgBlack, ship.initials, Color.Reset);
			this.drawGameBoard(board);
		}
	}

	testPlaceShip(ship, player, board) {
		let regex1 = new RegExp (/^([A-T]([1-9]|[1][0-9]|[2][0]))\-/);
		let regex2 = new RegExp (/\-([A-T]([1-9]|[1][0-9]|[2][0]))$/);
		let spaceRegex = new RegExp(/[A-Z]|[0-9]+/g);
		if (player.name === this.playerOne.name) {
			nameColor = Color.FgGreen;
		}
		else {
			nameColor = Color.FgBlue;
		}
		this.drawGameBoard(board);
		for (let i = 1; i < ship.size; i++) {
			console.log(this.addColor(nameColor, player.name, Color.Reset) + ", please choose a range of spaces for your " + ships.name + " (" + ships.size + " spaces total) using the format 'A1-A5' or 'B1-F5' that are located inside the board.");
			let response1 = this.validateRange(prompt()).match(regex1)[1].match(spaceRegex);
			let response2 = this.validateRange(prompt()).match(regex2)[1].match(spaceRegex);
			
		}
	}

	playRounds(playerOne, playerTwo, player1ExternalBoard, player2ExternalBoard, player1InternalBoard, player2InternalBoard) {
		let destroyedShips1 = [];
		let destroyedShips2 = [];
		let spaceRegex = new RegExp(/[A-Z]|[0-9]+/g);
		console.log("All ships have been placed." + "\n");
		
		while (playerOne.score < 4 && playerTwo.score < 4) {
			// PLAYER 1
			this.drawGameBoard(player1InternalBoard);
			console.log(playerOne.name + " this is what your board currently looks like.");
			this.clearConsole();
			this.drawGameBoard(player2ExternalBoard);
			console.log(this.addColor(Color.FgGreen, playerOne.name, Color.Reset) + " please select a space to attack.");
			let target = this.validateFormat(prompt()).match(spaceRegex);
			let rowIndex = this.findRow(target, player2InternalBoard);
			let columnIndex = target[1];
			while (player2ExternalBoard[rowIndex][columnIndex] === this.addColor(Color.BgRed + Color.FgBlack, "[X]", Color.Reset) || player2ExternalBoard[rowIndex][columnIndex] === this.addColor(Color.BgYellow + Color.FgBlack, "[0]", Color.Reset)) {
				console.log("You have already attacked this space.  Please choose a different space.");
				target = this.validateFormat(prompt()).match(spaceRegex);
				rowIndex = this.findRow(target, player2InternalBoard);
				columnIndex = target[1];
			}
			if (player2InternalBoard[rowIndex][columnIndex].includes("{")) {
				player2ExternalBoard[rowIndex][columnIndex] = this.addColor(Color.BgRed + Color.FgBlack, "[X]", Color.Reset);
				player2InternalBoard[rowIndex][columnIndex] = this.addColor(Color.BgRed + Color.FgBlack, "[X]", Color.Reset);
				this.drawGameBoard(player2ExternalBoard);
				console.log(this.addColor(Color.Bright, "HIT!", Color.Reset) + "\n");
			}
			else {
				player2ExternalBoard[rowIndex][columnIndex] = this.addColor(Color.BgYellow + Color.FgBlack, "[0]", Color.Reset);
				player2InternalBoard[rowIndex][columnIndex] = this.addColor(Color.BgYellow + Color.FgBlack, "[0]", Color.Reset);
				this.drawGameBoard(player2ExternalBoard);
				console.log(this.addColor(Color.Bright, "MISS!", Color.Reset) + "\n");
			}
			this.trackScore(this.ships1, destroyedShips1, player2InternalBoard, rowIndex, columnIndex, playerOne, playerTwo);
			console.log("Current score for " + this.addColor(Color.FgGreen, playerOne.name, Color.Reset) + ": " + playerOne.score);
			this.clearConsole();
			if (playerOne.score === 4) {
				console.log(this.addColor(Color.Bright, "Congratulations " + this.addColor(Color.FgGreen, playerOne.name, Color.Reset) + ". You won!" + "\r\n", Color.Reset));
				return;
			}

			// PLAYER 2
			this.drawGameBoard(player2InternalBoard);
			console.log(playerTwo.name + " this is what your board currently looks like.");
			this.clearConsole();
			this.drawGameBoard(player1ExternalBoard);
			console.log(this.addColor(Color.FgBlue, playerTwo.name, Color.Reset) + " please select a space to attack.");
			target = this.validateFormat(prompt()).match(spaceRegex);
			rowIndex = this.findRow(target, player1InternalBoard);
			columnIndex = target[1];
			while (player1ExternalBoard[rowIndex][columnIndex] === this.addColor(Color.BgRed + Color.FgBlack, "[X]", Color.Reset) || player1ExternalBoard[rowIndex][columnIndex] === this.addColor(Color.BgYellow + Color.FgBlack, "[0]", Color.Reset)) {
				console.log("You have already attacked this space.  Please choose a different space.");
				target = this.validateFormat(prompt()).match(spaceRegex);
				rowIndex = this.findRow(target, player1InternalBoard);
				columnIndex = target[1];
			}
			this.drawGameBoard(player1ExternalBoard);
			if (player1InternalBoard[rowIndex][columnIndex].includes("{")) {
				player1ExternalBoard[rowIndex][columnIndex] = this.addColor(Color.BgRed + Color.FgBlack, "[X]", Color.Reset);
				player1InternalBoard[rowIndex][columnIndex] = this.addColor(Color.BgRed + Color.FgBlack, "[X]", Color.Reset);
				this.drawGameBoard(player2ExternalBoard);
				console.log(this.addColor(Color.Bright, "HIT!", Color.Reset) + "\n");
			}
			else {
				player1ExternalBoard[rowIndex][columnIndex] = this.addColor(Color.BgYellow + Color.FgBlack, "[0]", Color.Reset);
				player1InternalBoard[rowIndex][columnIndex] = this.addColor(Color.BgYellow + Color.FgBlack, "[0]", Color.Reset);
				this.drawGameBoard(player1ExternalBoard);
				console.log(this.addColor(Color.Bright, "MISS!", Color.Reset) + "\n");
			}
			this.trackScore(this.ships2, destroyedShips2, player1InternalBoard, rowIndex, columnIndex, playerTwo, playerOne);
			console.log("Current score for " + this.addColor(Color.FgBlue, playerTwo.name, Color.Reset) + ": " + playerTwo.score);
			this.clearConsole();
		}
		if (playerTwo.score === 4) {
			console.log(this.addColor(Color.Bright, "Congratulations " + this.addColor(Color.FgGreen, playerTwo.name, Color.Reset) + ". You won!" + "\r\n", Color.Reset));
			return;
		}
	}

	trackScore(ships, destroyedShips, internalBoard, rowIndex, columnIndex, currentPlayer, opposingPlayer) {
		for (let i = 0; i < ships.length; i++) {
			if (internalBoard[rowIndex][columnIndex] === this.addColor(Color.BgCyan + Color.FgBlack, ships[i].initials, Color.Reset)) {
				ships[i].hits++;
				if (ships[i].hits === ships[i].size) {
					if (destroyedShips.length === 0) {
						destroyedShips.push(ships[i].name);
					}
					else if (destroyedShips.length > 0) {
						destroyedShips.push(" " + ships[i].name);
					}
					currentPlayer.score++;
					console.log(this.addColor(Color.Bright, "You sunk ", Color.Reset) + this.addColor(Color.Bright + opposingPlayer.color, opposingPlayer.name, Color.Reset) + this.addColor(Color.Bright, "'s " + ships[i].name, Color.Reset + "!"));
				}
			}
		}
		if (destroyedShips.length > 0) {
			console.log("Ships you have destroyed: " + destroyedShips);
		}
		else {
			console.log("Ships you have destroyed: none");
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

	validateRange(range) {
		let regex1 = new RegExp (/^([A-T]([1-9]|[1][0-9]|[2][0]))\-/);
		let regex2 = new RegExp (/\-([A-T]([1-9]|[1][0-9]|[2][0]))$/);
		while (!regex1.test(range) && !regex2.test(range)) {
			console.log("Your entry is invalid. Please enter a range of spaces in the format 'A1-A5' or 'B1-F5' that are located inside the board.");
			range = prompt();
		}
		return range;
	}

	rangeEqualsShipSize(ship, response1, response2) {
		while (Math.abs(response1[0].charCodeAt(0) - response2[0].charCodeAt(0)) !== ship.size && respone1[1] !== response2[1] || Math.abs(response1[1] - response2[1]) !== ship.size && response1[0].charCodeAt(0) === response2[0].charCodeAt(0)) {
			console.log("The range of values you entered is invalid. It must the size of your " + ship.name + "(" + ship.size + " spaces) in a vertical or horizontal line.");
		}
		return true;
		}
	}


	addColor(color, str, reset) {
		return (color + str + reset);
	}

	clearConsole() {
		readlineSync.question("When you are finished reviewing the board, please hit enter.", {hideEchoBack: true, mask: ''});
		process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
	}
}

/*====================================================================*/

module.exports = {
   Game: Game
}