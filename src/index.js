import { Ship } from "../src/ship.js";
import {Realplayer, ComputerPlayer } from "../src/player.js";
import { renderBoard } from "./render.js";

const submarine = new Ship(3);
const cruiser = new Ship(4);
const destructor = new Ship(5)
const player1 = new Realplayer('Oswaldo');
const computer = new ComputerPlayer();
const boardPlayerContainer = document.getElementById('player_gameboard');
const boardComputerContainer = document.getElementById('computer_gameboard');

player1.gameboard.placeShip(submarine, 5, 5, 'vertical');
player1.gameboard.placeShip(cruiser, 1, 5, 'horizontal');
player1.gameboard.placeShip(cruiser, 7, 1, 'horizontal');
computer.gameboard.placeShip(submarine, 6, 1, 'horizontal');


renderBoard(player1, boardPlayerContainer);
renderBoard(computer, boardComputerContainer);

