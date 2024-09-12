import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const MaterialComponents = [
    MatInputModule,
    MatIconModule,
    MatButtonModule
]

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents],
  })
  export class MaterialModule { }
  