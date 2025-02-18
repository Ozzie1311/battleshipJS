import {Ship} from './ship.js'

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.createBoard();
    this.ships = [];
    this.shipGrid = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
  }

  createBoard() {
    return Array(this.size).fill().map(() => Array(this.size).fill(null));
  }

  canPlaceShip(row, col, size, isHorizontal) {
    if (isHorizontal) {
      if (col + size > this.size) return false;
      for (let i = 0; i < size; i++) {
        if (this.board[row][col + i] !== null) return false;
      }
    } else {
      if (row + size > this.size) return false;
      for (let i = 0; i < size; i++) {
        if (this.board[row + i][col] !== null) return false;
      }
    }
    return true;
  }

  placeShip(row, col, size, isHorizontal) {
    if (!this.canPlaceShip(row, col, size, isHorizontal)) return false;

    const ship = new Ship(size);
    this.ships.push(ship);

    if (isHorizontal) {
      for (let i = 0; i < size; i++) {
        this.board[row][col + i] = 'ship';
        this.shipGrid[row][col + i] = ship;
      }
    } else {
      for (let i = 0; i < size; i++) {
        this.board[row + i][col] = 'ship';
        this.shipGrid[row + i][col] = ship;
      }
    }
    return true;
  }

  receiveAttack(row, col) {
    if (this.board[row][col] === 'hit' || this.board[row][col] === 'miss') return null;

    if (this.board[row][col] === 'ship') {
      this.board[row][col] = 'hit';
      const ship = this.shipGrid[row][col];
      if (ship) {
        ship.hit();
      }
      return 'hit';
    }

    this.board[row][col] = 'miss';
    return 'miss';
  
  }

  findShipWithFewestHits() {
    return this.ships.findIndex(ship => !ship.isSunk());
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  getCellState(row, col) {
    return this.board[row][col];
  }
}