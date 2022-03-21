import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IPost } from 'src/app/models/IPost';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input('postItem') post!: IPost;
  @Output('onDeletePost') postEmitter = new EventEmitter<IPost>();

  @ViewChild('dialogAlarm') dialogAlarm!: ElementRef;

  errorAlarm = '';
  detailsActive = false;
  showDetailsActive = true;
  commentActive = false;

  flag1 = true;
  flag2 = false;

  constructor() {}

  deletePost() {
    this.dialogAlarm.nativeElement.classList.add('backdrop');
    this.dialogAlarm.nativeElement.classList.remove('ref');
    this.errorAlarm = 'Are you sure?';
  }

  closeDialog() {
    this.dialogAlarm.nativeElement.classList.remove('backdrop');
    this.dialogAlarm.nativeElement.classList.add('ref');
  }

  yesAnswer() {
    this.postEmitter.emit(this.post);
    this.closeDialog();
  }

  noAnswer() {
    this.closeDialog();
  }

  showDetails() {
    this.detailsActive = true;
    this.showDetailsActive = false;
  }

  closeDetails() {
    this.detailsActive = false;
    this.showDetailsActive = true;
  }

  likePost() {
    if (this.flag1 == true) {
      this.flag1 = false;
      this.flag2 = true;
    } else {
      this.flag1 = true;
      this.flag2 = false;
    }
  }

  addComment() {
    if (this.commentActive == false) this.commentActive = true;
    else this.commentActive = false;
  }

  editPost() {}
}
