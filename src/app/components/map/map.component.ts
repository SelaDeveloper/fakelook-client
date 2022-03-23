import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AcMapComponent,
  ViewerConfiguration,
  ActionType,
  CameraService,
} from 'angular-cesium';
import { map, mergeMap, Observable, of, pairwise } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post.service';
import { PopUpPostComponent } from '../pop-up-post/pop-up-post.component';

const randomLocation = require('random-location');

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ViewerConfiguration],
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(
    private viewerConf: ViewerConfiguration,
    private postService: PostService,
    public dialog: MatDialog
  ) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: true,
      animation: false,
      homeButton: true,
      geocoder: true,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      useDefaultRenderLoop: true,
    };
  }

  @ViewChild('map') map!: AcMapComponent;

  entities$!: Observable<any>;
  private camera!: CameraService;
  Cesium = Cesium;
  selectedPost!: IPost;
  showDialog = false;

  ngAfterViewInit(): void {
    this.camera = this.map.getCameraService();
  }
  ngOnInit(): void {
    this.initPostsInList();
  }

  initPostsInList() {
    this.entities$ = this.postService.getPost().pipe(
      pairwise(),
      map((posts) => {
        const combine = posts[0].concat(posts[1]);
        return combine.map((post: IPost) => ({
          id: post.id,
          actionType: this.getActionType(post, posts[1]),
          entity: {
            ...post,
            location: Cesium.Cartesian3.fromDegrees(
              post.x_Position,
              post.y_Position
            ),
          },
        }));
      }),

      mergeMap((entity) => entity)
    );
  }

  getActionType(post: IPost, newPosts: IPost[]): ActionType {
    let action;
    newPosts.find((p) => p.id === post.id)
      ? (action = ActionType.ADD_UPDATE)
      : (action = ActionType.DELETE);
    return action;
  }

  showFullPost(post: IPost): void {
    this.showDialog = true;
    this.selectedPost = post;
    this.dialog.open(PopUpPostComponent, {
      data: {
        post: this.selectedPost,
      },
    });
  }
  closeDialog(): void {
    this.showDialog = false;
  }
}
