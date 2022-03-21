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
  imgActive = true;

  userId = 0;
  description = '';
  x_Position = 0;
  y_Position = 0;
  z_Position = 0;
  date = Date;
  likes = [];
  comments = '';
  hashTag = '';
  userTag = '';

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
        // likes: this.likes.length,
        // comments: this.comments,
        // hashTag: this.hashTag,
        // userTag: this.userTag,
      };
      this.postEmitter.emit(post);
      // this.postService.insertPost(post).subscribe(
      //   (res) => {
      //     console.log(res);
      //   },
      //   (error) => console.log(error)
      // );

      this.description = '';
      this.x_Position = 0;
      this.y_Position = 0;
      this.z_Position = 0;
      this.date = Date;
      this.likes = [];
      this.comments = '';
      this.hashTag = '';
      this.userTag = '';
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
    } else if (this.hasWhiteSpace(this.hashTag)) {
      this.errorAlarm = 'Please, put #Tags without spaces!';
      this.openDialog();
      return false;
    } else if (this.hasWhiteSpace(this.userTag)) {
      this.errorAlarm = 'Please, put "Tagged users" without spaces!';
      this.openDialog();
      return false;
    } else if (this.urlFile == null) {
      this.errorAlarm = 'Please, choose a picture!';
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
      this.imgActive = false;
    };
  }

  hasWhiteSpace(s: string) {
    return s.indexOf(' ') >= 0;
  }

  // addPostExample(img: any): void {
  //   const form = new FormData();
  //   form.append('description', this.post.description);
  //   form.append('location', JSON.stringify(this.homeLocation()));
  //   form.append('image', this.file);
  //   this.submitEmitter.emit(form);
  //   this.post = new Post();
  //   img.value = '';
  //   this.file = undefined;
  // }

  // private homeLocation(): void {
  //   navigator.geolocation.getCurrentPosition((data) => {
  //     const { latitude, longitude } = data.coords;
  //     const position = Cesium.Cartesian3.fromDegrees(longitude, latitude);
  //     const entity = {
  //       id: 'my-home',
  //       position,
  //     };
  //     this.entities$ = of({
  //       id: entity.id,
  //       actionType: ActionType.ADD_UPDATE,
  //       entity,
  //     });
  //   });
  // }
}
