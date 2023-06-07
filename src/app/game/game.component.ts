import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = "";
  game!: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }

  takeCard() {
    if (!this.pickCardAnimation){
      this.currentCard = this.game.stack.pop() as string;
      console.log(this.currentCard)
      this.pickCardAnimation = true;
      console.log(this.game.playedCards)

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard)
      }, 1000);
    }
    
  }
}
