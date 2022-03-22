import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from '../models/IComment';
import { IFilter } from '../models/IFilter';
import { ILike } from '../models/ILike';
import { IPost } from '../models/IPost';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postUrl = `${environment.baseUrl}Posts`;
  private likeUrl = `${environment.baseUrl}Posts/LikeUnLike`;
  private commentUrl = `${environment.baseUrl}Posts/AddComment`;
  private filterUrl = `${environment.baseUrl}Posts/Filter`;

  constructor(private http: HttpClient) {}

  getPost(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postUrl);
  }

  insertPost(post: IPost): Observable<IPost> {
    let httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<IPost>(this.postUrl, post, httpOption);
  }

  insertLike(postId: number, userId: number): Observable<IPost> {
    let httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<IPost>(
      this.likeUrl + '?postId=' + postId + '&userId=' + userId,
      httpOption
    );
  }

  insertComment(comment: IComment): Observable<IPost> {
    let httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<IPost>(this.commentUrl, comment, httpOption);
  }

  insertFilter(filter: IFilter): Observable<IPost[]> {
    let httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<IPost[]>(this.filterUrl, filter, httpOption);
  }

  deletePost(post: IPost) {
    let httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete<IPost>(this.postUrl + '/' + post.id, httpOption);
  }
}
