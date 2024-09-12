import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './components/email/email.component';
import { ResultComponent } from './components/result/result.component';
import { SearchComponent } from './components/search/search.component';
import { EmailGuard } from './guards/email.guard';
import { SearchGuard } from './guards/search.guard';
import { ResultGuard } from './guards/result.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [EmailGuard],
    component: EmailComponent
  },
  {
    path: 'search',
    canActivate: [SearchGuard],
    component: SearchComponent
  },
  {
    path: 'result',
    canActivate: [ResultGuard],
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
