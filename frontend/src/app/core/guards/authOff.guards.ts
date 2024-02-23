import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardOff implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {}

  canActivate(): boolean {
    const storage = this.storageService.getUser();
    const token = storage?.token ?? null;
    if (token) {
      this.router.navigate(['/feed']);
    }
    return true;
  }
}
