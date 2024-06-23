import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private dataToken = 'dataToken';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  storeToken(token: string): void {
    localStorage.setItem(this.dataToken, token); // Stocke le token dans le LocalStorage
  }

  getToken(): string | null {
    return localStorage.getItem(this.dataToken); // Récupère le token depuis le LocalStorage
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  confirm(email: string, confirmationCode: string): Observable<any> {
    const body = { email, confirmation_code: confirmationCode };
    return this.http.post<any>(`${this.apiUrl}/confirm`, body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || error);
  }
}
