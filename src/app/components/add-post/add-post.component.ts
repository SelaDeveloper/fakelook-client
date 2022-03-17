import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  @Output('onAddPost') postEmitter = new EventEmitter<IPost>();

  @ViewChild('dialogAlarm') dialogAlarm!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  errorAlarm = '';
  urlFile: any;

  userId = 0;
  description = '';
  img = '';
  x_position = 0;
  y_position = 0;
  z_position = 0;
  date = Date;
  likes = NaN;
  comments = '';
  userName = '';
  hashTag = '';
  userTag = '';

  addPost() {
    if (this.ValidationValues()) {
      if (this.urlFile != null) this.img = this.urlFile;

      const post: IPost = {
        userId: this.authService.getId(),
        description: this.description,
        img: this.img,
        x_position: this.x_position,
        y_position: this.y_position,
        z_position: this.z_position,
        date: new Date(),
        // likes: NaN,
        // comments: this.comments,
        // hashTag: this.hashTag,
        // userTag: this.userTag,
      };

      this.postService.insertPost(post).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => console.log(error)
      );

      this.description = '';
      this.img = '';
      this.x_position = 0;
      this.y_position = 0;
      this.z_position = 0;
      this.date = Date;
      this.comments = '';
      this.userName = '';
      this.hashTag = '';
      this.userTag = '';
      this.urlFile = null;
      this.fileInput.nativeElement.value = '';
    }
  }

  ValidationValues(): boolean {
    if (this.description == '') {
      this.errorAlarm = 'Please, put your description!';
      this.openDialog();
      return false;
    } else if (this.x_position <= 0 || isNaN(this.x_position)) {
      this.errorAlarm = 'Please, put x_position';
      this.openDialog();
      return false;
    } else if (this.urlFile != null && this.img != '') {
      this.errorAlarm = 'Please, delete the URL first!';
      this.openDialog();
      return false;
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
    };
  }
}
