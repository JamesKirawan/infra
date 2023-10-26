import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'app/main/authentication/service/auth.service';
import { UserService } from 'app/main/user/service/user.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, take, switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {UserService} _userService
   */

  private refreshTokenInProgress = false;
  private accessTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
  constructor(
    private _userService: UserService,
    private _jwtHelper: JwtHelperService,
    private _authService: AuthService
    ) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._userService.currentUserValue;
    const accessToken = this._userService.getAccessToken();
    const isLoggedIn = currentUser && accessToken;
    request = request.clone({
      url: `${environment.apiUrl}${request.url}`,
      withCredentials: true
    });
    if (isLoggedIn) {
      if(request.url.indexOf('token') !== -1) {
        return next.handle(request)
      }
      if(this._jwtHelper.isTokenExpired()){
        if(!this.refreshTokenInProgress){
          this.refreshTokenInProgress = true
          this.accessTokenSubject.next(null);
          return this._authService.refreshToken().pipe(
            switchMap((res) => {
              if(res.accessToken){
                localStorage.removeItem('accessToken');
                localStorage.setItem('accessToken', res.accessToken);// update token
                this.refreshTokenInProgress = false;
                this.accessTokenSubject.next(res.accessToken);
                return next.handle(this.injectToken(request));
              }
            }),
          );
        }
        else {
          return this.accessTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap((res) => {
                return next.handle(this.injectToken(request))
            })
        );
        }
      }
      else{
        return next.handle(this.injectToken(request))
      }
    }
    else{
      return next.handle(request);
    }
  }

  injectToken(request: HttpRequest<any>) {
    const accessToken = this._userService.getAccessToken();
    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
    });
  }
}
