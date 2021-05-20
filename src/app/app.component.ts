import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  squares!: any[];
  xIsNext!: boolean;
  winner!: string;

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = '';
  }

  get player() {
    return this.xIsNext ? 'O' : 'X';
  }

  makeMove(idx: number) {
    if (this.winner) {
      this.toastr.success(this.winner);
    } else if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
    switch (this.winner) {
      case 'X':
        this.winner = 'Winner is Player Two';
        break;
      case 'O':
        this.winner = 'Winner is Player One';
        break;
      case 'Draw':
        this.winner = 'Draw Match';
        break;
    }
    // if (!this.squares.includes('')) this.winner = 'Draw';
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    if (!this.squares.includes(null)) return 'Draw';
    return null;
  }
}
