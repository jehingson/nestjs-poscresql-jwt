import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/v1/posts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  create(title: string, content: string): Observable<any> {
    return this.http.post(
      `${AUTH_API}`,
      {
        title,
        content,
      },
      httpOptions,
    );
  }

  postsAll(take: number, skip: number): Observable<any> {
    return this.http.get(`${AUTH_API}?take=${take}&skip=${skip}`);
  }
}
