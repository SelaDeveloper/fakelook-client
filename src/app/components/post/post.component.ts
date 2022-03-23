import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ILike } from 'src/app/models/ILike';
import { IPost } from 'src/app/models/IPost';
import { ITag } from 'src/app/models/ITag';
import { PostService } from 'src/app/services/post.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input('postItem') post: IPost;
  @Output('onDeletePost') postEmitter = new EventEmitter<IPost>();

  @ViewChild('dialogAlarm') dialogAlarm!: ElementRef;

  errorAlarm = '';
  detailsActive = false;
  showDetailsActive = true;

  commentActive = false;
  likedByUser = false;
  likesCount = 0;
  userId = parseInt(sessionStorage.getItem('id')!);

  constructor(private postsService: PostService) {
    this.post = {} as IPost;
  }
  ngOnInit(): void {
    this.checkIfLiked(this.post);
  }

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
    this.postsService
      .insertLike(this.post.id!, this.userId)
      .subscribe((res) => {
        this.checkIfLiked(res);
      });

    if (this.likedByUser == true) {
      this.likedByUser = false;
    } else {
      this.likedByUser = true;
    }
  }

  addComment() {
    if (this.commentActive == false) this.commentActive = true;
    else this.commentActive = false;
  }

  editPost() {
    this.splitTag();
  }

  checkIfLiked(post: IPost) {
    this.likesCount = 0;
    post.likes?.forEach((element) => {
      if (element.isActive) {
        this.likesCount++;
        if (element.userId == this.userId) this.likedByUser = true;
        else {
          this.likedByUser = false;
        }
      } else {
        this.likedByUser = false;
      }
    });
  }

  splitTag() {
    let tagsArr = this.post.tags;
    let resultArr;
    return (resultArr = tagsArr?.map((p) => p.content).toString());
  }

  splitUserTaggedPost() {
    let userTagsArr = this.post.userTaggedPost;
    let resultArr;
    return (resultArr = userTagsArr?.map((p) => p.user.userName).toString());
  }
}
