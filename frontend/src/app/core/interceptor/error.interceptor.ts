import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/main/user/service/user.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   */
  constructor(
    private _router: Router,
    private _userService: UserService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          localStorage.removeItem('currentUser')
          localStorage.removeItem('accessToken')
          this._router.navigate(['/auth/login'])
          this._userService.currentUserSubject.next(null)
          return throwError(err);
        }
        else{
          console.log(err)
          const error = err.error.message;
          return throwError(error);
        }
      })
    );
  }
}
