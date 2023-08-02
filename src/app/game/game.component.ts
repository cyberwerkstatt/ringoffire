import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { update } from '@angular/fire/database';




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
  gameId!: string;


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      let params_id = params["id"];
      this.gameId = params_id;
      let aCollection = collection(this.firestore, 'games');
      let docRef = doc(aCollection, params_id)
      docData(docRef).subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        console.log(game)
      })

    });

  }

  // 


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
          this.saveGame();
        }
      } catch {
        return;
      }

    });
  }

  async saveGame() {
    this.route.params.subscribe(async (params) => {
      let params_id = params["id"];
      let aCollection = collection(this.firestore, 'games');
      let docRef = doc(aCollection, params_id);
      await updateDoc(docRef, this.game.toJson())

      
      
      // docData(docRef).subscribe((game: any) => {
      //   let db = collection(this.firestore, "games");
      //   update(db, this.game.toJson());
      // });
    });
  }
}
