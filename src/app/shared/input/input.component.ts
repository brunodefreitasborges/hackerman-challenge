import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-shared-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class SharedInputComponent {

  @Input() formControl: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() mask: string = '';
  @Input() appearance:  MatFormFieldAppearance = 'outline';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() icon: string = '';
  @Input() iconColor: 'primary' | 'accent' | 'warn' = 'primary';
}
