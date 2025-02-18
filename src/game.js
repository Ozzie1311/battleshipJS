import { Gameboard } from './models/gameboard.js'
import { Player } from './models/player.js'
import { Gameview } from './views/gameView.js'

export class Game {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.SHIP_SIZES = [5, 4, 3, 3, 2];
    this.currentShipIndex = 0;
    this.isPlacementPhase = true;
    this.isHorizontal = true;
    
    this.playerBoard = new Gameboard();
    this.computerBoard = new Gameboard();
    this.player = new Player('Player');
    this.computer = new Player('Computer', true);
    this.gameview = new Gameview(
      this.handlePlayerMove.bind(this),
      this.handleShipPlacement.bind(this),
      this.toggleOrientation.bind(this),
      this.restartGame.bind(this)
    );
    
    this.setupGame();
  }

  setupGame() {
    this.placeComputerShips();
    this.startShipPlacement();
    this.render();
  }

  startShipPlacement() {
    this.gameview.showPlacementControls();
    this.gameview.updateMessage(`Place your ${this.SHIP_SIZES[this.currentShipIndex]}-unit ship. Press 'R' to rotate`);
  }

  toggleOrientation() {
    this.isHorizontal = !this.isHorizontal;
    this.render();
  }

  handleShipPlacement(row, col) {
    if (!this.isPlacementPhase) return;

    const placed = this.playerBoard.placeShip(
      row, 
      col, 
      this.SHIP_SIZES[this.currentShipIndex], 
      this.isHorizontal
    );

    if (placed) {
      this.currentShipIndex++;
      if (this.currentShipIndex >= this.SHIP_SIZES.length) {
        this.isPlacementPhase = false;
        this.gameview.hidePlacementControls();
        this.gameview.updateMessage('All ships placed! Game started - your turn!');
      } else {
        this.gameview.updateMessage(`Place your ${this.SHIP_SIZES[this.currentShipIndex]}-unit ship. Press 'R' to rotate`);
      }
      this.render();
    }
  }

  placeComputerShips() {
    this.SHIP_SIZES.forEach(size => {
      let placed = false;
      while (!placed) {
        const row = this.computer.getRandomPosition(this.computerBoard.size);
        const col = this.computer.getRandomPosition(this.computerBoard.size);
        const isHorizontal = Math.random() < 0.5;
        
        placed = this.computerBoard.placeShip(row, col, size, isHorizontal);
      }
    });
  }

  render() {
    const playerBoardElement = document.getElementById('player-board');
    const computerBoardElement = document.getElementById('computer-board');
    
    this.gameview.renderBoard(
      playerBoardElement, 
      this.playerBoard, 
      true, 
      this.isPlacementPhase,
      this.isHorizontal,
      this.SHIP_SIZES[this.currentShipIndex]
    );
    this.gameview.renderBoard(
      computerBoardElement, 
      this.computerBoard, 
      false
    );
  }

  handlePlayerMove(row, col) {
    if (this.isPlacementPhase) return;
    
    const result = this.computerBoard.receiveAttack(row, col);
    
    if (result === 'hit') {
      this.gameview.updateMessage('¡Hit! Your turn again!');
      if (this.computerBoard.allShipsSunk()) {
        this.endGame('Player');
        return;
      }
    } else if (result === 'miss') {
      this.gameview.updateMessage('Miss! Computer\'s turn...');
      setTimeout(() => this.computerMove(), 500);
    }
    
    this.render();
  }

  computerMove() {
    const { row, col } = this.computer.getComputerMove(this.playerBoard);
    const result = this.playerBoard.receiveAttack(row, col);

    if (result === 'hit') {
      this.gameview.updateMessage('Computer hit your ship!');
      if (this.playerBoard.allShipsSunk()) {
        this.endGame('Computer');
        return;
      }
      setTimeout(() => this.computerMove(), 500);
    } else {
      this.gameview.updateMessage('Your turn!');
    }

    this.render();
  }

  endGame(winner) {
    this.gameview.updateMessage(`Game Over! ${winner} wins!`);
    this.gameview.disableBoard();
    this.gameview.showRestartButton();
  }

  restartGame() {
    this.initialize();
  }
}