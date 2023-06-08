export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for(let i = 1; i < 14; i++){
            this.stack.push("spade_"+ i);
            this.stack.push("hearts_"+ i);
            this.stack.push("clubs_"+ i);
            this.stack.push("diamonds_"+ i);
        }
        
        this.shuffle(this.stack); // Mischen des Stapels
        // this.shuffle(this.players); // Mischen der Spieler (falls Spieler vorhanden sind)
    }

    private shuffle(array: any[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}