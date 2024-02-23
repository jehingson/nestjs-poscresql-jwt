import { Component } from '@angular/core';
import { CreatePostComponent } from '../components/posts/create-post/create-post.component';
import { RouterOutlet } from '@angular/router';
import { ListPostComponent } from '../components/posts/list-post/list-post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  imports: [RouterOutlet, CreatePostComponent, ListPostComponent],
})
export class FeedComponent {}
