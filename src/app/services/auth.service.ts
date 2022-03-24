import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  subs: Subscription[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  signUp(user: IUser): void {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const currentUrl = `${environment.baseUrl}Auth/SignUp`;
    this.subs.push(
      this.http.post<any>(currentUrl, user, httpOptions).subscribe(
        (res) => {
          this.setToken(res.token);
          this.setId(res.id);
          sessionStorage.setItem('userName', user.userName);
          this.router.navigateByUrl('/fakelook');
        },
        (err) => {
          if (err.status == 500) {
            window.alert(
              'Sorry, this UserName in use!, please try another UserName...'
            );
          }
        }
      )
    );
  }
  login(user: IUser): void {
    const currentUrl = `${environment.baseUrl}Auth/Login`;

    this.subs.push(
      this.http.post<any>(currentUrl, user).subscribe(
        (res) => {
          console.log(res.status);
          this.setToken(res.token);
          this.setId(res.id);
          sessionStorage.setItem('userName', user.userName);
          this.router.navigateByUrl('/fakelook');
        },
        (err) => {
          if (err.status == 500) {
            window.alert(
              'Sorry,your password or UserName was incorrect!, please try again...'
            );
          }
        }
      )
    );
  }

  reserPassword(user: IUser): void {
    const currentUrl = `${environment.baseUrl}Auth/userName`;
    let httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.subs.push(
      this.http
        .put<any>(
          currentUrl +
            '?userName=' +
            user.userName +
            '&newPassword=' +
            user.password,
          httpOption
        )
        .subscribe((res) => {
          if (res == null) window.alert('Wrong UserName, please try again!');
          this.setToken(res.token);
          this.setId(res.id);
          sessionStorage.setItem('userName', user.userName);
          this.router.navigateByUrl('/login');
          window.alert('Good, password was changed!');
        })
    );
  }

  checkAccess(): Observable<boolean> {
    const currentUrl = `${environment.baseUrl}Auth/TestAll`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
    });
    return this.http.get(currentUrl, { headers }).pipe(
      map((_) => true),
      catchError((_) => of(false))
    );
  }
  secret(): Observable<any> {
    const currentUrl = `${environment.baseUrl}Secret/`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
    });
    const all$ = this.http.get<any>(currentUrl + 'All');
    const auth$ = this.http
      .get<any>(currentUrl + 'Authenticated', { headers })
      .pipe(catchError((err) => of({ msg: 'you are not authenticated' })));
    const admin$ = this.http
      .get<any>(currentUrl + 'Admin', { headers })
      .pipe(catchError((err) => of({ msg: 'you are not admin' })));
    return combineLatest(all$, auth$, admin$).pipe(map((res) => ({ ...res })));
  }
  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  private setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public getId(): number {
    var parseId = Number.parseInt(sessionStorage.getItem('id') || '');
    return parseId ? parseId : 0;
  }
  private setId(id: string): void {
    sessionStorage.setItem('id', id);
  }
}
