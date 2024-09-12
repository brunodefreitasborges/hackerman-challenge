import { Component, inject } from '@angular/core';
import { SearchStore } from './components/search/store/search.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  store = inject(SearchStore);

  title = 'desafio-hackerman';

}
