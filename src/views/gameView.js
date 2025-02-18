export class Gameview {
  constructor(onCellClick, onPlacementClick, onRotate) {
    this.onCellClick  = onCellClick;
    this.onPlacementClick = onPlacementClick;
    this.onRotate = onRotate;
    this.messageElement = document.getElementById('message');

    //Add keyboad listener for rotation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'r') {
        this.onRotate();
      }
    });
  }

  renderBoard(boardElement, gameBoard, isPlayer, isPlacement = false, isHorizontal = true, shipSize = 0) {
    boardElement.innerHTML = '';
    boardElement.style.pointerEvents = isPlacement ? 'auto' : isPlayer ? 'none' : 'auto';

    for (let i = 0; i < gameBoard.size; i++) {
      for (let j = 0; j < gameBoard.size; j++) {
        const cell = this.createCell(i, j, gameBoard.getCellState(i, j), isPlayer, isPlacement);

        if (isPlacement) {
          cell.addEventListener('mouseover', () => this.showPlacementPreview(i, j, shipSize, isHorizontal, gameBoard, boardElement));
          cell.addEventListener('mouseout', () => this.clearPlacementPreview(boardElement));
        }

        boardElement.appendChild(cell);
      }
    }
  }

  showPlacementPreview(row, col, shipSize, isHorizontal, gameBoard, boardElement) {
    this.clearPlacementPreview(boardElement);

    if (!gameBoard.canPlaceShip(row, col, shipSize, isHorizontal)) {
      return;
    }

    const cells = boardElement.children;
    if (isHorizontal) {
      for (let i = 0; i < shipSize && col + i < gameBoard.size; i++) {
        const index = row * gameBoard.size + (col + i);
        if (index < cells.length) {
          cells[index].classList.add('preview');
        }
      }
    } else {
      for (let i = 0; i < shipSize && col + i < gameBoard.size; i++) {
        const index = (row + i) * gameBoard.size + col;
        if (index < cells.length) {
          cells[index].classList.add('preview');
        }
      }
    }
  }

  clearPlacementPreview(boardElement) {
    const cells = boardElement.getElementsByClassName('preview');
    while (cells.length > 0) {
      cells[0].classList.remove('preview');
    }
  }

  createCell(row, col, value, isPlayer, isPlacement) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = row;
    cell.dataset.col = col;

    if (isPlayer && value === 'ship') {
      cell.classList.add('ship');
    }
    if (value === 'hit') {
      cell.classList.add('hit');
    }
    if (value === 'miss') {
      cell.classList.add('miss');
    }

    if (isPlacement) {
      cell.addEventListener('click', () => this.onPlacementClick(row, col));
    } else if (!isPlayer) {
      cell.addEventListener('click', () => {
        if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
          this.onCellClick(row, col);
        }
      });
    }

    return cell;
  }

  updateMessage(message) {
    this.messageElement.textContent = message;
  }

  showPlacementControls() {
    document.getElementById('computer-board').style.display = 'none';
    document.querySelector('.board-container:nth-child(2)').style.display = 'none';
  }

  hidePlacementControls() {
    document.getElementById('computer-board').style.display = 'grid';
    document.querySelector('.board-container:nth-child(2)').style.display = 'flex';
  }

  disableBoard() {
    document.getElementById('computer-board').style.pointerEvents = 'none';
  }
}