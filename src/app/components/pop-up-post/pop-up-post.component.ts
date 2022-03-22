import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPost } from 'src/app/models/IPost';

@Component({
  selector: 'app-pop-up-post',
  templateUrl: './pop-up-post.component.html',
  styleUrls: ['./pop-up-post.component.scss'],
})
export class PopUpPostComponent {
  popUpPost!: IPost;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.popUpPost = {} as IPost;
    this.popUpPost = data.post;
  }

  deletePost(post: IPost) {}
}
