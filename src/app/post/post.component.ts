import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post.model';
import { postService } from '../post.service';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post?: Post;
  @Input() index: number = 0;

  constructor(private postService: postService, private route: Router, private backEndService: BackEndService) {}

  ngOnInit(): void {
    console.log(this.post);
  }

  delPost() {
    this.postService.deletePost(this.index);
    this.backEndService.saveData();
  }

  editPost() {
    this.route.navigate(["/edit", this.index]);
  }

  likePost() {
    this.postService.likePost(this.index);
    this.backEndService.saveData();
  }
}
