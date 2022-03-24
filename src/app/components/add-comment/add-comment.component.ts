import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IComment } from 'src/app/models/IComment';
import { IPost } from 'src/app/models/IPost';
import { ITag } from 'src/app/models/ITag';
import { IUser } from 'src/app/models/IUser';
import { IUserTaggedComment } from 'src/app/models/IUserTaggedComment';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Output() commentEmitter = new EventEmitter<IPost>();
  @Input() postId?: number;
  @ViewChild('dialogAlarm') dialogAlarm!: ElementRef;

  constructor(private postsService: PostService) {}

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
      this.postsService.insertComment(comment).subscribe(() => {
        this.commentEmitter.emit();
      });

      this.commentString = '';
    }
  }

  ValidationValues(): boolean {
    if (this.commentString == '') {
      this.errorAlarm = 'Please, put a comment first!';
      this.openDialog();
      return false;
    } else if (this.hasWhiteSpace(this.tagsString)) {
      this.errorAlarm = 'Please, put #Tags without spaces!';
      this.openDialog();
      return false;
    } else if (this.hasWhiteSpace(this.userTaggedPostString)) {
      this.errorAlarm = 'Please, put "Tagged users" without spaces!';
      this.openDialog();
      return false;
    } else return true;
  }

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

  openDialog() {
    this.dialogAlarm.nativeElement.classList.add('backdrop');
    this.dialogAlarm.nativeElement.classList.remove('ref');
  }

  closeDialog() {
    this.dialogAlarm.nativeElement.classList.remove('backdrop');
    this.dialogAlarm.nativeElement.classList.add('ref');
  }

  hasWhiteSpace(s: string) {
    return s.indexOf(' ') >= 0;
  }
}
