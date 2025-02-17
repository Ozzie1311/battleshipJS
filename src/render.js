import { Ship } from "./ship.js";

export function renderBoard(player, container) {
  for (let fila = 0; fila < player.gameboard.board.length; fila++) {
  for (let row = 0; row < player.gameboard.board[fila].length; row++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    // Almacena la fila y la columna como atributos data* para acceder a ellos en el evento click
    div.dataset.fila = fila;
    div.dataset.row = row;
    container.append(div);


    if (player.gameboard.board[fila][row] instanceof Ship) {
      div.classList.add('ship_cell')
    }

    div.addEventListener('click', (e) => {
      //Obtiene la fila y la columna de los elementos data
      let fila = parseInt(e.target.dataset.fila);
      let row = parseInt(e.target.dataset.row);
      // console.log(player.gameboard.receiveAttack(fila, row));
      player.gameboard.receiveAttack(fila, row);
      console.log(player.gameboard)

      if (player.gameboard.receiveAttack(fila, row)) {
        div.classList.remove('ship_cell');
        div.classList.add('ship_hit')
      }
    });
  }
}
};