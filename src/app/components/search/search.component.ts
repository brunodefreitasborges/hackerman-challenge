import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchStore } from './store/search.store';
import { SearchResultItem } from './service/search.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {

  private _searchStore = inject(SearchStore);
  private _router = inject(Router);

  searchResult$: Observable<SearchResultItem | undefined> = this._searchStore.getResults();
  errors$: Observable<string | undefined> = this._searchStore.getErrors();
  subscriptions: Subscription[] = [];

  searchForm = new FormGroup({
    query: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.subscriptions.push(this.errors$.subscribe((error) => {
      console.log(error);
      if(error) {
        this.searchForm.controls.query.setErrors({'invalid': error});
      }
    }));
  }

  submit(): Promise<boolean> {
    if(this.searchForm.valid) {
      this._searchStore.setQuery(this.searchForm.value.query!);
      this._searchStore.setErrors(undefined);
      this._searchStore.search(this.searchForm.value.query!);
      return this._router.navigate(['result']);
    } return Promise.resolve(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
