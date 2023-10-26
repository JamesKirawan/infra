import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/main/authentication/service/auth.service';
import { UserService } from 'app/main/user/service/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {UserService} _userService
   */
  constructor(
    private _router: Router, 
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._userService.currentUserValue;
    const accessToken = this._userService.getAccessToken();
    if (currentUser && accessToken) {
      // check if route is restricted by role
      if (currentUser.role !== 'Admin') {
        // role not authorised so redirect to not-authorized page
        // console.log('not authorized')
        this._router.navigate(['/pages/miscellaneous/not-authorized']);
        return false;
      }
      // console.log('authorized')
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    // console.log('not logged in')
    this._authService.logout();
    return false;
  }
}
