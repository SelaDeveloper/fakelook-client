import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post.service';
// import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-fakelook',
  templateUrl: './fakelook.component.html',
  styleUrls: ['./fakelook.component.scss'],
})
export class FakelookComponent implements OnInit {
  @ViewChild('dialogAlarm') dialogAlarm!: ElementRef;

  errorAlarm = '';
  error = false;
  posts: IPost[] = [];

  constructor(
    private postsService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPost().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => console.log(error)
    );
  }

  deletePost(post: IPost) {
    this.postsService.deletePost(post).subscribe(() => {
      this.getPosts();
    });
  }

  logOut() {
    this.dialogAlarm.nativeElement.classList.add('backdrop');
    this.dialogAlarm.nativeElement.classList.remove('ref');
    this.errorAlarm = 'Are you sure you want to LogOut?';
  }

  closeDialog() {
    this.dialogAlarm.nativeElement.classList.remove('backdrop');
    this.dialogAlarm.nativeElement.classList.add('ref');
  }

  yesAnswer() {
    sessionStorage.clear();
    this.router.navigate(['login'], { relativeTo: this.route });
    this.closeDialog();
  }

  noAnswer() {
    this.closeDialog();
  }
}
