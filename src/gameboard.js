export class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = Array.from({length: size}, () => Array(size).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, x, y, direction){
    for (let i = 0; i < ship.length; i++) {
      if (direction === 'horizontal') {
        this.board[x][y + i] = ship;
      } else {
        this.board[x + i][y] = ship;
      }
    }
    return this.ships.push(ship);
  }

  receiveAttack(x, y) { 
    const target = this.board[x][y];

    if (target) {
      target.hit(); //Llamando al método hit para aumentar el daño
      return true;
    } else {
      this.missedAttacks.push([x, y]); //Registrando el ataque fallido
      return false;
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk()); //Preguntando si todos los barcos estan hundidos.
  }
};