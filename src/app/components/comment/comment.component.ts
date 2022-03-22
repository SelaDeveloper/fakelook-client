import { Component, Input } from '@angular/core';
import { IComment } from 'src/app/models/IComment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input('postComment') postComment?: IComment;
  constructor() {}

  comment = '';
  tagsString = '';
  userTaggedPostString = '';

  splitComment() {
    let content = this.postComment;
    let resultArr;
    return (resultArr = content?.content);
  }

  splitCommentTag() {
    let comment = this.postComment;
    let resultArr;
    return (resultArr = comment?.tags?.map((t) => t.content).toString());
  }

  splitCommentUserTaggedPost() {
    let userTagsArr = this.postComment;
    let resultArr;
    return (resultArr = userTagsArr?.userTaggedComment
      ?.map((t) => t.user.userName)
      .toString());
  }
}
