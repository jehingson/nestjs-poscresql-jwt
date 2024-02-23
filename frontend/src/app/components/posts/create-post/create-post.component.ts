import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../../core/services/post.service';
import { PostResults } from '../../../interfaces/posts.interfaces';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  providers: [PostService],
})
export class CreatePostComponent {
  @Output() addNewPostEvent = new EventEmitter<PostResults>();

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    const { title, content } = this.form.value;
    this.postService.create(title, content).subscribe({
      next: (data) => {
        this.addNewPostEvent.emit({
          id: data.id,
          title: data.title,
          content: data.content,
          likes: data.likes,
          createdAt: data.createdAt,
          author: {
            id: data.author.id,
            fullName: data.author.fullName,
            age: data.author.age,
            email: data.author.email,
          },
        });
        this.form.reset();
        this.isLoggedIn = false;
        this.isLoginFailed = false;
        this.errorMessage = '';
        this.submitted = false;
        //
      },
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
