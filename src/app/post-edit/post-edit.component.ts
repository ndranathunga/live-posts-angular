import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../post.model';
import { postService } from '../post.service';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  form!: FormGroup;
  index: number = 0;
  editMode = false;

  constructor(
    private postService: postService,
    private router: Router,
    private route: ActivatedRoute,
    private backEndService: BackEndService
  ) {}

  ngOnInit(): void {
    let title = '';
    let description = '';
    let imagePath = '';

    this.route.params.subscribe((params: Params) => {
      if (params['index']) {
        this.index = params['index'];

        const post: Post = this.postService.getOnePost(this.index);

        title = post.title;
        description = post.description;
        imagePath = post.imgUrl;

        this.editMode = true;
      }
    });

    this.form = new FormGroup({
      title: new FormControl(title, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      description: new FormControl(description, [Validators.required]),
      imagePath: new FormControl(imagePath, [Validators.required]),
    });
  }

  onSubmit() {
    const title = this.form.value.title;
    const description = this.form.value.description;
    const imagePath = this.form.value.imagePath;

    const post: Post = new Post(
      title,
      description,
      imagePath,
      'test@test.com',
      new Date(),
      this.postService.getOnePost(this.index).noOfLikes
    );

    if (this.editMode) {
      this.postService.updatePost(this.index, post);
    } else {
      this.postService.newPost(post);
    }

    this.backEndService.saveData();
    
    this.router.navigate(['/post-list']);
  }
}
