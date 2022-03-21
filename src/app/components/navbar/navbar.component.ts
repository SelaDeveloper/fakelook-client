import { Component, EventEmitter, Output } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output('updateList') updatePostListEmitter = new EventEmitter<IPost>();
  @Output() searchUpdate = new EventEmitter<IPost>();

  constructor(private postsService: PostService) {}

  showAddPostActive = true;
  showFriendsActive = false;
  showSearchActive = false;

  updatePostsList(post: IPost) {
    this.postsService.insertPost(post).subscribe(() => {
      this.updatePostListEmitter.emit();
      // this.getPosts();
    });
  }

  addPostPage() {
    this.showAddPostActive = true;
    this.showFriendsActive = false;
    this.showSearchActive = false;
  }

  addFriendsPage() {
    this.showAddPostActive = false;
    this.showFriendsActive = true;
    this.showSearchActive = false;
  }

  addSearchPage() {
    this.showAddPostActive = false;
    this.showFriendsActive = false;
    this.showSearchActive = true;
  }
}
