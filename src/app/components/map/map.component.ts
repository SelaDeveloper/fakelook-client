import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AcMapComponent,
  ViewerConfiguration,
  ActionType,
  CameraService,
} from 'angular-cesium';
import { map, mergeMap, Observable, of } from 'rxjs';
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
      map((posts) => {
        return posts.map((post: IPost) => ({
          id: post.id,
          actionType: ActionType.ADD_UPDATE,
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

  goHome(): void {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;
        const position = Cesium.Cartesian3.fromDegrees(longitude, latitude);
        const entity = {
          id: 'my-home',
          position,
        };
        this.entities$ = of({
          id: entity.id,
          actionType: ActionType.ADD_UPDATE,
          entity,
        });
        this.zoomToLocation(position, 1000);
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }
  goRandom(): void {
    const randomStart = {
      latitude: 37.7768006 * Math.random(),
      longitude: -122.4187928 * Math.random(),
    };
    const radius = 5000000000 * Math.random(); // meters
    const { latitude, longitude } = randomLocation.randomCirclePoint(
      randomStart,
      radius
    );

    this.zoomToLocation(
      Cesium.Cartesian3.fromDegrees(longitude, latitude),
      100000
    );
  }
  private zoomToLocation(position: any, zoom: number): void {
    this.camera.cameraFlyTo({
      destination: position,
      complete: () => {
        this.camera.zoomOut(zoom);
      },
    });
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
