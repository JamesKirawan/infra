import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: Observable<User>;

  //private
  public currentUserSubject: BehaviorSubject<any>;
  constructor(
    private _httpClient: HttpClient,
    private _jwtHelper: JwtHelperService,
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    console.log(this.currentUserSubject.value)
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getUsers(): Observable<Array<User>> {
    return this._httpClient.get<Array<User>>(`/users`, { responseType: 'json'})
  }

  getUserById(userId: number): Observable<any> {
    return this._httpClient.get<any>(`/user/${userId}`, { responseType: 'json'})
  }

  reload(): void {
    this.getUserById(this.currentUserValue.userId).subscribe((resp) => {
      if(resp.user.length > 0) {
        this.currentUserSubject.next(resp.user[0])
        // console.log(this.currentUserValue)
        localStorage.removeItem('currentUser')
        localStorage.setItem('currentUser',JSON.stringify(resp.user[0]))
      }
    })
  }

  getUserDetail(): User {
    return this._jwtHelper.decodeToken(this.getAccessToken())
  }
  
  getAccessToken(): string {
    return localStorage.getItem('accessToken')
  }

  getUserRole(): string {
    return this.currentUserValue.role;
  }

  updateUserProfile(userId: number, data: FormData): Observable<any> {
    return this._httpClient.put<any>(`/user/${userId}`, data, { responseType: 'json'});
  }

}
