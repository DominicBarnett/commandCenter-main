import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from '../../../services/game.service';
import { Game } from '../../../models/game';
import { CommonModule,DatePipe } from '@angular/common';


@Component({
  selector: 'app-game-delete',
  templateUrl: './game-delete.component.html',
  styleUrls: ['./game-delete.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [DatePipe],
})
export class GameDeleteComponent implements OnInit {
  game: Game | null = null;
  confirmDeleteForm: FormGroup;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.confirmDeleteForm = this.fb.group({
      confirm: [false]
    });
  }

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameService.getGameById(gameId).subscribe(game => {
        this.game = game;
      });
    }
  }

  onDelete(): void {
    if (this.confirmDeleteForm.value.confirm && this.game?._id) {
      this.gameService.deleteGame(this.game._id).subscribe(() => {
        this.router.navigate(['/games']);
      });
    }
  }
}
