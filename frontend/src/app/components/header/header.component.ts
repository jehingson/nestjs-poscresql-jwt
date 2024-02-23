import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './header.component.html',
  providers: [StorageService, AuthService],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
  ) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean();
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
