import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/service/cookie.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {

  private _router = inject(Router);
  private _cookieService = inject(CookieService);

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submit(): Promise<boolean> {
    if (this.emailForm.valid) {
      this._cookieService.setCookie('email', this.emailForm.controls.email.value!, 7);
      return this._router.navigate(['/search']);
    }
    return Promise.resolve(false);
  }
}
