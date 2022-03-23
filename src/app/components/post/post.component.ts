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
import { IUser } from 'src/app/models/IUser';
import { IUserTaggedPost } from 'src/app/models/IUserTaggedPost';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input('postItem') post: IPost;
  @Output('onDeletePost') postEmitter = new EventEmitter<any>();
  @Output() commentEmitter = new EventEmitter<IPost>();

  @ViewChild('dialogAlarm') dialogAlarm!: ElementRef;

  errorAlarm = '';
  detailsActive = false;
  editActive = false;
  showDetailsActive = true;
  newUsersTags? = '';
  newTags? = '';

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
    if (!this.editActive) this.editActive = true;
    else this.editActive = false;
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

  splitTagFromArray() {
    let tagsArr = this.post.tags;
    let resultArr = tagsArr?.map((p) => p.content).toString();
    this.newTags = resultArr;
    return resultArr;
  }

  splitUserTaggedPostFromArray() {
    let userTagsArr = this.post.userTaggedPost;
    let resultArr = userTagsArr?.map((p) => p.user.userName).toString();
    this.newUsersTags = resultArr;
    return resultArr;
  }

  splitTagsFromString(str: string) {
    let splitted = str.split(',');
    for (var i = 0; i < splitted.length; i++) {
      this.post.tags![i] = {} as ITag;
      this.post.tags![i].content = splitted[i];
    }
    return this.post.tags;
  }

  splitUserTaggedFromString(str: string) {
    var splitted = str.split(',');
    for (var i = 0; i < splitted.length; i++) {
      this.post.userTaggedPost![i] = {} as IUserTaggedPost;
      this.post.userTaggedPost![i].user = {} as IUser;
      this.post.userTaggedPost![i].user.userName = splitted[i];
    }
    return this.post.userTaggedPost;
  }

  saveChanges() {
    this.post.userTaggedPost = this.splitUserTaggedFromString(
      this.newUsersTags!
    );
    this.post.tags = this.splitTagsFromString(this.newTags!);
    this.postsService.editPost(this.post).subscribe((res) => {
      this.commentEmitter.emit();
    });
    this.editActive = false;
  }

  makeComment() {
    this.commentEmitter.emit();
  }
}
