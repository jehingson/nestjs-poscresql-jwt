import { Component } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './list-post.component.html',
  providers: [PostService],
})
export class ListPostComponent {
  public postsList$!: Observable<any[]>;

  errorMessage = '';

  constructor(private postsService: PostService) {}

  ngOnInit(): void {
    // this.postsList$ = this.postsService.postsAll(10, 0).subscribe();
  }
}
