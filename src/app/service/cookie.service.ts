import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() { }

  setCookie(name: string, value: string, days: number): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '') + '; path=/';
    document.cookie = `${name}=${cookieValue}`;
  }

  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }
}
