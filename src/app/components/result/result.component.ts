import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SearchStore } from '../search/store/search.store';
import { SearchResultItem } from '../search/service/search.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  private _searchStore = inject(SearchStore);
  private _router = inject(Router);

  searchResult$: Observable<SearchResultItem | undefined> = this._searchStore.getResults();
  errors$: Observable<string | undefined> = this._searchStore.getErrors();

  ngOnInit(): void {
    this._searchStore.getQuery().subscribe((query) => {
      if(query == undefined) {
        this._searchStore.resetResult();
        this._router.navigate(['search']);
      }
    });
    this.errors$.subscribe((error) => {
      if(error) {
        this._searchStore.resetResult();
        this._router.navigate(['search']);
      }
    });
  }

  return(): Promise<boolean> {
    this._searchStore.resetResult();
    return this._router.navigate(['search']);
  }
}
