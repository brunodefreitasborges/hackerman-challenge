import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { SearchStore } from '../components/search/store/search.store';
import { LocalStorageService } from '../service/local-storage.service';
import { SearchResultItem } from '../components/search/service/search.model';

@Injectable({
  providedIn: 'root'
})
export class ResultGuard implements CanActivate {
  constructor(
    private _searchStore: SearchStore,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {}

  canActivate(): Observable<boolean> {
    const storedResult: SearchResultItem | null = this._localStorageService.getItem('result');

    if (storedResult) {
      // If a stored result exists, populate the store
      this._searchStore.setResults(storedResult);
      return of(true);
    }
    return this._searchStore.getQuery().pipe(
      take(1),
      map(query => {
        if (query === undefined) {
          this._searchStore.resetResult();
          this._router.navigate(['search']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this._searchStore.resetResult();
        this._router.navigate(['search']);
        return of(false);
      })
    );
  }
}