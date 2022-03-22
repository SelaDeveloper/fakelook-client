import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IComment } from 'src/app/models/IComment';
import { ILike } from 'src/app/models/ILike';
import { IPost } from 'src/app/models/IPost';
import { ITag } from 'src/app/models/ITag';
import { IUser } from 'src/app/models/IUser';
import { IUserTaggedPost } from 'src/app/models/IUserTaggedPost';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // navigator.geolocation.getCurrentPosition((postion)=> {
    //   this.post.x_Position = postion.coords.longitude
    //   this.post.y_Position = postion.coords.latitude
    //   // if(postion.coords.altitude !== null)
    //   this.post.z_Position = 3620170.526302757
    //   // postion.coords.altitude לטפל בזה בהמשך
    //   // else  this.post.z_Position = 0
    // });
  }

  @Output('onAddPost') postEmitter = new EventEmitter<IPost>();

  @ViewChild('dialogAlarm') dialogAlarm!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  errorAlarm = '';
  urlFile: any;
  imgActive = true;

  userId = 0;
  description = '';
  x_Position = 0;
  y_Position = 0;
  z_Position = 0;
  date = Date;
  likes: ILike[] = [];
  comments: IComment[] = [];
  tags: ITag[] = [];
  userTaggedPost: IUserTaggedPost[] = [];
  tagsString = '';
  userTaggedPostString = '';

  addPost() {
    if (this.ValidationValues()) {
      const post: IPost = {
        userId: this.authService.getId(),
        description: this.description,
        imageSorce: this.urlFile,
        x_Position: this.x_Position,
        y_Position: this.y_Position,
        z_Position: this.z_Position,
        date: new Date(),
        tags: this.splitTags(this.tagsString),
        userTaggedPost: this.splitUserTaggedPost(this.userTaggedPostString),
      };
      this.postEmitter.emit(post);

      this.description = '';
      this.x_Position = 0;
      this.y_Position = 0;
      this.z_Position = 0;
      this.date = Date;
      this.likes = [];
      this.comments = [];
      this.tags = [];
      this.tagsString = '';
      this.userTaggedPost = [];
      this.urlFile = null;
      this.fileInput.nativeElement.value = '';
      this.imgActive = true;
    }
  }

  ValidationValues(): boolean {
    if (this.description == '') {
      this.errorAlarm = 'Please, put a description!';
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
      // } else if (this.urlFile == null) {
      //   this.errorAlarm = 'Please, choose a picture!';
      //   this.openDialog();
      //   return false;
    } else return true;
  }

  openDialog() {
    this.dialogAlarm.nativeElement.classList.add('backdrop');
    this.dialogAlarm.nativeElement.classList.remove('ref');
  }

  closeDialog() {
    this.dialogAlarm.nativeElement.classList.remove('backdrop');
    this.dialogAlarm.nativeElement.classList.add('ref');
  }

  onFileSelected(event: any) {
    var reader = new FileReader();
    var file = reader.readAsDataURL(event.target.files[0]);

    reader.onload = (file) => {
      this.urlFile = reader.result;
      this.imgActive = false;
    };
  }

  hasWhiteSpace(s: string) {
    return s.indexOf(' ') >= 0;
  }

  splitTags(tagsString: string) {
    var splitted = tagsString.split(',');
    for (var i = 0; i < splitted.length; i++) {
      this.tags[i] = {} as ITag;
      this.tags[i].content = splitted[i];
    }
    return this.tags;
  }

  splitUserTaggedPost(userTaggedPostString: string) {
    var splitted = userTaggedPostString.split(',');
    for (var i = 0; i < splitted.length; i++) {
      this.userTaggedPost[i] = {} as IUserTaggedPost;
      this.userTaggedPost[i].user = {} as IUser;
      this.userTaggedPost[i].user.userName = splitted[i];
    }
    return this.userTaggedPost;
  }
}
