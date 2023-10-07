import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { postService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  listOfPosts: Post[] = [];

  constructor(private postService: postService) {}

  ngOnInit(): void {
    this.listOfPosts = this.postService.getPost();

    this.postService.listChangedEvent.subscribe((listOfPosts: Post[]) => {
      this.listOfPosts = this.postService.getPost();
    });
  }
}
