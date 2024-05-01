import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; // Make sure you have a User model

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  createUser(userData: { name: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData);
  }

  getUsers(includeDeleted: boolean = false): Observable<User[]> {
    const url = `${this.baseUrl}/users${includeDeleted ? '?includeDeleted=true' : ''}`;
    return this.http.get<User[]>(url);
  }

    // Method to update a user
    updateUser(id: string, userData: Partial<User>): Observable<User> {
      return this.http.put<User>(`${this.baseUrl}/users/${id}`, userData);
    }
  
    // Method to soft delete a user
    deleteUser(id: string): Observable<User> {
      return this.http.delete<User>(`${this.baseUrl}/users/${id}`, {});
    }
}

