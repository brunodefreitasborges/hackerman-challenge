import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { EmailComponent } from './components/email/email.component';
import { SearchComponent } from './components/search/search.component';
import { SearchStore } from './components/search/store/search.store';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    SearchComponent,
    ResultComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [SearchStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
