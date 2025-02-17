import { Gameboard } from "./gameboard.js";


export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard(10);
  }

  attack(targetPlayer, x, y) {
    return targetPlayer.gameboard.receiveAttack(x, y);
  }
}

export class Realplayer extends Player {
  constructor(name) {
    super(name); 
  }
}

export class ComputerPlayer extends Player {
  constructor() {
    super('Computer');//Estableciendo un nombre fijo
  }

  attack(targetPlayer) {
    let x, y;

    //generar coordenadas aleatorias hasta encontrar un ataque válido
    do {
      x = Math.floor(Math.random() * this.gameboard.size);
      y = Math.floor(Math.random() * this.gameboard.size);
    } while (targetPlayer.gameboard.board[x][y] === null && !targetPlayer.gameboard.missedAttacks.some(coord => coord[0] === x && coord[1] === y));
    return super.attack(targetPlayer, x, y); //Llamar al método atack del padre
  }
};