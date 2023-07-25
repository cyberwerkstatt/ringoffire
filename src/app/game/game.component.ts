import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = "";
  game!: Game
  item$: any;
  

  constructor(private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    let aCollection = collection(this.firestore, 'games')
    this.item$ = collectionData(aCollection).subscribe((game) => {
      console.log("game update", game)
    });
  }
 

  newGame() {
    this.game = new Game();
    this.firestore.collection("games").add({"hallo":"welt"})
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      console.log(this.currentCard)
      this.pickCardAnimation = true;
      console.log(this.game.playedCards)

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard)
      }, 1000);
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    console.log(dialogRef)

    dialogRef.afterClosed().subscribe(name => {

      try {
        if(name.length > 0) {
          this.game.players.push(name);
        }
      } catch {
        return;
      }
     
    });
  }
}
