import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from '../service/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class EmailGuard implements CanActivate {
  private _cookieService = inject(CookieService);
  private _router = inject(Router);

  canActivate(): boolean {
    const emailCookie = this._cookieService.getCookie('email');
    
    if (emailCookie) {
      this._router.navigate(['/search']);
      return false;
    }
    
    return true;
  }
}
