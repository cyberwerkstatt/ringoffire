import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router, private firestore: Firestore){ }

  ngOnInit(): void {
      
  }

  async newGame(){
    // start game
    let newGame = new Game();
    let aCollection = collection(this.firestore, 'games');
    let firestoreGame = await addDoc(aCollection, newGame.toJson());
    
    this.router.navigateByUrl("/game/" + firestoreGame.id)

  }

}
