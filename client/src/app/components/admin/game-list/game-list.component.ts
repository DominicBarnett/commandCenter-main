import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { GameService } from '../../../services/game.service';
import { Game } from '../../../models';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  providers: [DatePipe],
  standalone:true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class GameListComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService, private router: Router, private _datePipe:DatePipe) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
    });
  }

  editGame(id: string): void {
    this.router.navigate(['/admin/game/edit', id]);
  }

  deleteGame(id: string): void {
    this.router.navigate(['/admin/game/delete', id]);
  }

  newGame(): void {
    this.router.navigate(['/admin/game/new']);
  }
}
