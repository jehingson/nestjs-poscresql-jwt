import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const storage = window.sessionStorage.getItem(USER_KEY);
    const data = storage ? JSON.parse(storage) : null;
    return data?.user ?? null;
  }

  public getToken(): string {
    const storage = window.sessionStorage.getItem(USER_KEY);
    const data = storage ? JSON.parse(storage) : null;
    return data?.token ?? null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    return user ? true : false;
  }
}
