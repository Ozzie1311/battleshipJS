import { Ship } from "../src/ship.js";
import {Realplayer, ComputerPlayer } from "../src/player.js";

const submarine = new Ship(3);
const cruiser = new Ship(4);
const player1 = new Realplayer('Oswaldo');
const computer = new ComputerPlayer();
const boardContainer = document.getElementById('gameboard');

player1.gameboard.placeShip(submarine, 5, 5, 'vertical');
player1.gameboard.placeShip(cruiser, 1, 5, 'horizontal')
console.log(player1.gameboard.board);

player1.renderBoard(boardContainer)

// for(let i = 0; )

// function renderBoard() {
//   for (let fila = 0; fila < player1.gameboard.board.length; fila++) {
//   for (let row = 0; row < player1.gameboard.board[fila].length; row++) {
//     const div = document.createElement('div');
//     div.classList.add('cell');
//     // Almacena la fila y la columna como atributos data* para acceder a ellos en el evento click
//     div.dataset.fila = fila;
//     div.dataset.row = row;
//     boardContainer.append(div);


//     if (player1.gameboard.board[fila][row] instanceof Ship) {
//       div.classList.add('ship_cell')
//       console.log('hola mundo');
//     }

//     div.addEventListener('click', (e) => {
//       //Obtiene la fila y la columna de los elementos data
//       let fila = parseInt(e.target.dataset.fila);
//       let row = parseInt(e.target.dataset.row);
//       console.log(player1.gameboard.receiveAttack(fila, row))
//     });
//   }
// }
// };

// renderBoard();