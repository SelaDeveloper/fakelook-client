import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IComment } from 'src/app/models/IComment';
import { ITag } from 'src/app/models/ITag';
import { IUser } from 'src/app/models/IUser';
import { IUserTaggedComment } from 'src/app/models/IUserTaggedComment';
import { IUserTaggedPost } from 'src/app/models/IUserTaggedPost';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Output('onAddComment') commentEmitter = new EventEmitter<IComment>();
  @Input() postId?: number;

  constructor(
    private authService: AuthService,
    private postsService: PostService
  ) {}

  commentString = '';
  tagsString = '';
  userTaggedPostString = '';
  errorAlarm = '';
  user = [];
  tags: ITag[] = [];
  userTaggedComment: IUserTaggedComment[] = [];

  addComment() {
    if (this.ValidationValues()) {
      const comment: IComment = {
        user: { userName: sessionStorage.getItem('userName') } as IUser,
        content: this.commentString,
        postId: this.postId || 0,
        tags: this.splitTags(this.tagsString),
        userTaggedComment: this.splitUserTaggedComment(
          this.userTaggedPostString
        ),
      };

      console.log(comment);
      this.postsService.insertComment(comment).subscribe(() => {});
      // this.commentEmitter.emit(comment);

      this.commentString = '';
    }
  }

  ValidationValues(): boolean {
    // if (this.description == '') {
    //   this.errorAlarm = 'Please, put a description!';
    //   this.openDialog();
    //   return false;
    // } else if (this.hasWhiteSpace(this.tagsString)) {
    //   this.errorAlarm = 'Please, put #Tags without spaces!';
    //   this.openDialog();
    //   return false;
    // } else if (this.hasWhiteSpace(this.userTaggedPostString)) {
    //   this.errorAlarm = 'Please, put "Tagged users" without spaces!';
    //   this.openDialog();
    //   return false;
    // } else if (this.urlFile == null) {
    //   this.errorAlarm = 'Please, choose a picture!';
    //   this.openDialog();
    //   return false;
    // } else
    return true;
  }

  closeDialog() {}

  splitTags(tagsString: string) {
    var splitted = tagsString.split(',');
    for (var i = 0; i < splitted.length; i++) {
      this.tags[i] = {} as ITag;
      this.tags[i].content = splitted[i];
    }
    return this.tags;
  }

  splitUserTaggedComment(userTaggedPostString: string) {
    var splitted = userTaggedPostString.split(',');
    for (var i = 0; i < splitted.length; i++) {
      this.userTaggedComment[i] = {} as IUserTaggedComment;
      this.userTaggedComment[i].user = {} as IUser;
      this.userTaggedComment[i].user.userName = splitted[i];
    }
    return this.userTaggedComment;
  }
}
