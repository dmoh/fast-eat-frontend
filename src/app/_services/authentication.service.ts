import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '@app/_models/user';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  public get tokenUserCurrent(): string {
    return; // this.currentUserSubject.value.token;
  }
  login(email: string, password: string) {
    const optionRequete = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/authentication_token`, { email, password }, optionRequete)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        window.location.reload();
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    window.location.reload();
    this.router.navigate(['home']);
  }

  public checkIsAdmin() {
    const optionRequete = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<any>(`${environment.apiUrl}/is-admin`, {tokenUser: user.token },
      optionRequete
      );
  }
}
