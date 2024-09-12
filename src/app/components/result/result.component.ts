import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SearchStore } from '../search/store/search.store';
import { SearchResultItem } from '../search/service/search.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  private _searchStore = inject(SearchStore);
  private _router = inject(Router);

  searchResult$: Observable<SearchResultItem | undefined> = this._searchStore.getResults();

  return(): Promise<boolean> {
    this._searchStore.resetResult();
    return this._router.navigate(['search']);
  }

  trackByFn(index: number, item: string): number {
    return index;
  }
}
