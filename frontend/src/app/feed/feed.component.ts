import { Component } from '@angular/core';
import { CreatePostComponent } from '../components/posts/create-post/create-post.component';
import { RouterOutlet } from '@angular/router';
import { ListPostComponent } from '../components/posts/list-post/list-post.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { PostResults } from '../interfaces/posts.interfaces';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  imports: [
    RouterOutlet,
    CreatePostComponent,
    ListPostComponent,
    ProfileComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FeedComponent {
  newPostEvent: string = '';

  addNewPostEvent(post: PostResults) {
    console.log('post', post);
    if (post) {
      this.newPostEvent = JSON.stringify(post);
    }
  }
}
