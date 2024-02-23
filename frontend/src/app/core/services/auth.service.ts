import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/v1/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${AUTH_API}/login`,
      {
        email,
        password,
      },
      httpOptions,
    );
  }

  register(
    fullName: string,
    age: number,
    email: string,
    password: string,
  ): Observable<any> {
    return this.http.post(
      `${AUTH_API}/register`,
      {
        fullName,
        age,
        email,
        password,
      },
      httpOptions,
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${AUTH_API}/logout`, {}, httpOptions);
  }

  profile(): Observable<any> {
    return this.http.get(`${AUTH_API}/profile`);
  }
}
