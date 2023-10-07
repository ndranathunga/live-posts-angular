import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Post } from './post.model';
import { postService } from './post.service';

@Injectable({ providedIn: 'root' })
export class BackEndService {
  constructor(private postService: postService, private http: HttpClient) {}

  saveData() {
    const listOfPosts: Post[] = this.postService.getPost();

    this.http
      .put(
        'https://live-posts-f6782-default-rtdb.firebaseio.com/posts.json',
        listOfPosts
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchData() {
    this.http
      .get<Post[]>(
        'https://live-posts-f6782-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        tap((listOfPosts: Post[]) => {
          this.postService.FetchFromDB(listOfPosts);
        })
      )
      .subscribe();
  }
}
