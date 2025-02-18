export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
  }

  getRandomPosition(size) {
    return Math.floor(Math.random() * size);
  }

  getComputerMove(gameboard) {
    let row, col;
    
    do {
      row = this.getRandomPosition(gameboard.size);
      col = this.getRandomPosition(gameboard.size);
    } while(
      gameboard.getCellState(row, col) === 'hit' ||
      gameboard.getCellState(row, col) === 'miss' 
    );
    return { row, col };
  } 
}