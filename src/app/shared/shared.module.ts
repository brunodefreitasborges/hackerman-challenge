import { NgModule } from "@angular/core";
import { SharedInputComponent } from "./input/input.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
    declarations: [
        SharedInputComponent,
    ],
    exports: [
        SharedInputComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        NgxMaskDirective
    ]
})
export class SharedModule {
}