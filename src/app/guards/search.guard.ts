import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from '../service/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class SearchGuard implements CanActivate {
  private _cookieService = inject(CookieService);
  private _router = inject(Router);

  canActivate(): boolean {
    const emailCookie = this._cookieService.getCookie('email');
    
    if (!emailCookie) {
      this._router.navigate(['']);
      return false;
    }
    
    return true;
  }
}
