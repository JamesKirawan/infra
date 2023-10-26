import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'app/shared/service/alert/alert.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/model/user.viewmodel';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _alertService: AlertService,
    private _userService: UserService
  ) {
   }
  login(email: string, password: string): Observable<any>{
    return this._httpClient
    .post<any>(`/login`, { email, password })
    .pipe(
      map((resp: any) => {
        // console.log(resp.accessToken)
        localStorage.setItem('accessToken', resp.accessToken);
        let user: User = this._userService.getUserDetail()
        // console.log(user)
        localStorage.setItem('currentUser', JSON.stringify(user))
        this._userService.currentUserSubject.next(user)
        this._alertService.toastrSuccess(`Welcome ${this._userService.currentUserValue.userName}!`,2000, {hr: 'right', vr:'top'});
        this._router.navigate(['/shop'])
        // if(user.role === 'Admin')
        //   this._router.navigate(['/dashboard'])
        // else
        //   this._router.navigate(['/shop'])
        return;
      })
    );
  }

  logout(): void {
    this._httpClient.delete(`/logout`, { responseType: 'text'}).subscribe((resp) => {
      localStorage.removeItem('currentUser')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('config')
      this._userService.currentUserSubject.next(null)
      this._router.navigate(['/auth/login'])
    })
  }

  register(user: User): Observable<any> {
    return this._httpClient.post<any>(`/user`, user, { responseType: 'json'})
  }

  refreshToken(): Observable<any> {
    return this._httpClient.get<any>(`/token`, { responseType: 'json'})
  }
}
