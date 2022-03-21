import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-fakelook',
  templateUrl: './fakelook.component.html',
  styleUrls: ['./fakelook.component.scss'],
})
export class FakelookComponent implements OnInit {
  error = false;
  posts: IPost[] = [];

  constructor(private postsService: PostService) {}
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPost().subscribe(
      (posts) => {
        this.posts = posts;
        console.log(posts);
      },
      (error) => console.log(error)
    );
  }

  // updatePostsList(post: IPost) {
  //   this.postsService.insertPost(post).subscribe(() => {
  //     this.getPosts();
  //   });
  // }

  deletePost(post: IPost) {
    this.postsService.deletePost(post).subscribe(() => {
      this.getPosts();
    });
  }
}
