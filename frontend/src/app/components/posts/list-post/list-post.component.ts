import { Component, Input } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostResults } from '../../../interfaces/posts.interfaces';
import { parseFromNow } from '../../../shared/utils/parseFromNow';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './list-post.component.html',
  providers: [PostService],
})
export class ListPostComponent {
  @Input() newPostEvent: string = '';
  postsList: PostResults[] = [];
  errorMessage = '';

  constructor(private postsService: PostService) {}

  ngOnInit(): void {
    this.postsService.postsAll(10, 0).subscribe({
      next: (data: PostResults[]) => {
        this.postsList = data;
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  ngOnChanges() {
    if (this.newPostEvent) {
      const post = JSON.parse(this.newPostEvent);
      this.postsList.unshift(post);
    }
  }

  parseFormat(date: Date) {
    return parseFromNow(date);
  }
}
