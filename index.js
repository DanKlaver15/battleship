"use strict";

// Battleship game using Node.js

// 2 player game (create classes for players)
// Use a 2-dimensional array with a minimum space size of 20x20
// Each player will place all 4 ships (destroyer/submarine/battleship/aircraft carrier) without overlapping or extending past the edge of the "board"
// Each ship location is hidden from the other player
// Each player takes a turn, calls a column then row (or row then column)
// Console print of the other player's board as they know it showing hits/misses
// Console print of the current player's board as well with hits/misses
// Program should keep track of each player's score (number of ships destroyed completely)