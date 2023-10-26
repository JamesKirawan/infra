import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'app/main/user/service/user.service';

@Injectable({ providedIn: 'root' })
export class UserAuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {UserService} _userService
   */
  constructor(private _router: Router, private _userService: UserService) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._userService.currentUserValue;
    const accessToken = this._userService.getAccessToken();
    if (currentUser && accessToken) {
      // check if route is restricted by role
      if (currentUser.role !== 'User') {
        // role not authorised so redirect to not-authorized page
        this._router.navigate(['/auth/login']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/auth/login']);
    return false;
  }
}
