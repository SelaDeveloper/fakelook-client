import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPost } from '../models/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postUrl = `${environment.baseUrl}Posts`;

  constructor(private http: HttpClient) {}

  getPost(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postUrl);
  }

  insertPost(post: IPost): Observable<IPost> {
    let httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    post;
    return this.http.post<IPost>(this.postUrl, post, httpOption);
  }

  deletePost(post: IPost) {
    let httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete<IPost>(this.postUrl + '/' + post.id, httpOption);
  }
}
