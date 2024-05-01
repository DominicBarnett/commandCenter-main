import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseUrl = '/api'; // Adjust if your API is hosted differently

  constructor(private http: HttpClient) { }

  getGames(includeDeleted = false): Observable<Game[]> {
    const url = `${this.baseUrl}/games${includeDeleted ? '?includeDeleted=true' : ''}`;
    return this.http.get<Game[]>(url);
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/games/${id}`);
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/games`, game);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.baseUrl}/games/${game._id}`, game);
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/games/${id}`);
  }
}
