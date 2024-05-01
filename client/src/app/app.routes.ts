import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './components/admin/game-list/game-list.component';
import { GameDetailComponent } from './components/admin/game-detail/game-detail.component';
import { ParticipationComponent } from './components/participation/participation.component';
import { GameDeleteComponent } from './components/admin/game-delete/game-delete.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { NewUserFormComponent } from './components/admin/new-user-form/new-user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: GameListComponent },
  { path: 'games/new', component: GameDetailComponent },
  { path: 'participations', component: ParticipationComponent },
  { path: 'admin/games', component: GameListComponent },
  { path: 'admin/game/new', component: GameDetailComponent },
  { path: 'admin/game/edit/:id', component: GameDetailComponent },  // Reuse for edit
  { path: 'admin/game/delete/:id', component: GameDeleteComponent },  // Optional
  { path: 'admin/users', component: UserListComponent },
  { path: 'admin/new-user', component: NewUserFormComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
