import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, addDoc, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';




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


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      let params_id = params["id"];
      let aCollection = collection(this.firestore, 'games');
      let docRef = doc(aCollection, params_id)
      let docdata = docData(docRef)
      console.log(docdata)
      this.item$ = collectionData(aCollection).subscribe((game) => {
        // console.log("game update", game)
      });
    });

  }

  


  newGame() {
    this.game = new Game();

    // let db = collection(this.firestore,"games");
    // addDoc(db,
    //   this.game.toJson()
    // )
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
        if (name.length > 0) {
          this.game.players.push(name);
        }
      } catch {
        return;
      }

    });
  }
}
