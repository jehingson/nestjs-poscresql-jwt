import { Component } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  providers: [StorageService],
})
export class ProfileComponent {
  user: any = {};

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.user = this.storageService.getUser();
  }
}
