import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit,OnChanges{

  cardAction = [
    { title: "Wasserfall", description: "Alle müssen gleichzeitig anfangen zu trinken. Sobald Spieler 1 aufhört zu trinken, darf Spieler 2 aufhören zu trinken. Spieler 3 darf aufhören, sobald Spieler 2 aufhört zu trinken, und so weiter." },
    { title: "Du", description: "Du entscheidest, wer trinken muss." },
    { title: "Ich", description: "Herzlichen Glückwunsch! Trinke einen Shot!" },
    { title: "Kategorie", description: "Überlege dir eine Kategorie (z.B. Farben). Jeder Spieler muss einen Gegenstand aus dieser Kategorie nennen." },
    { title: "Tanzeinlae", description: "Spieler 1 macht einen Tanzschritt. Spieler 2 wiederholt den Tanzschritt und fügt einen zweiten hinzu." },
    { title: "Mädels", description: "Alle Mädchen trinken." },
    { title: "Himmel", description: "Hände hoch! Der letzte Spieler trinkt!" },
    { title: "Partner",description: "Wähle einen Partner. Dein Partner muss immer trinken, wenn du trinkst, und umgekehrt." },
    { title: "Daumenmeister",description: "" },
    { title: "Männer", description: "Alle Männer trinken." },
    { title: "Quizmeister", description: "" },
    { title: "Ich habe noch nie...", description: "Sage etwas, was du noch nie gemacht hast. Jeder, der es schon gemacht hat, muss trinken." },
    { title: "Regel", description: "Stelle eine Regel auf. Jeder muss trinken, wenn er gegen die Regel verstößt." }
  ]

  title = '';
  description = '';
  @Input() card!: string;

  constructor(){ }

  ngOnInit(){
    console.log(this.card)
  }

  ngOnChanges(): void {
    if (this.card) {
      console.log('Current card is:', this.card);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }

  

}
