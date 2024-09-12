import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SearchService } from "../service/search.service";
import { catchError, concatMap, forkJoin, map, mergeMap, Observable, of, switchMap, take } from "rxjs";
import { SearchResultItem } from "../service/search.model";

export interface SearchState {
    query?: string;
    results?: SearchResultItem;
    error?: string;
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {

    constructor(private _searchService: SearchService) {
        super({});
    }

    readonly search = this.effect((query$: Observable<string>) => {
        return query$.pipe(
            switchMap(query => this._searchService.search(query)
        .pipe(tapResponse(
            (result) => {
                if (result.results.length === 0 || result.results.length > 1) {
                    throw new Error('Personagem inválido');
                }
                this.fetchDetails(result.results[0]);
            },
            (error: string) => {
                this.setErrors(error);
            }
        )))
        );
    });

    buildRequest(urls: string[]) {
        if(urls.length === 0) {
            return of(null);
        } else {
            return urls.map(url => this._searchService.fetchDetails(url));
        }
    }

     readonly fetchDetails = this.effect((results$: Observable<SearchResultItem>) => {
        return results$.pipe(
            concatMap(results => {
                const homeworldRequest = this._searchService.fetchDetails(results.homeworld);
                const filmsRequests = results.films.map(url => this._searchService.fetchDetails(url));
                const speciesRequests = results.species.map(url => this._searchService.fetchDetails(url));
                const vehiclesRequests = results.vehicles.map(url => this._searchService.fetchDetails(url));
                const starshipsRequests = results.starships.map(url => this._searchService.fetchDetails(url));

                return forkJoin({
                    homeworld: homeworldRequest,
                    films: filmsRequests.length > 0 ? forkJoin(filmsRequests) : of(['N/A']),
                    species: speciesRequests.length > 0 ? forkJoin(speciesRequests): of(['N/A']),
                    vehicles: vehiclesRequests.length > 0 ? forkJoin(vehiclesRequests): of(['N/A']),
                    starships: starshipsRequests.length > 0 ? forkJoin(starshipsRequests): of(['N/A']),
                }).pipe(
                    map(details => {
                        return {
                            ...results,
                            homeworld: details.homeworld.name,
                            films: details.films.map(film => typeof film === 'string' ? film : film.title),
                            species: details.species.map(species => typeof species === 'string' ? species : species.name),
                            vehicles: details.vehicles.map(vehicle => typeof vehicle === 'string' ? vehicle : vehicle.name),
                            starships: details.starships.map(starship => typeof starship === 'string' ? starship : starship.name)
                        };
                    }),
                    tapResponse(
                        (updatedResults) => {
                            this.setResults(updatedResults);
                        },
                        (error: string) => {
                            this.setErrors(error);
                        }
                    )
                );
            })
        );
    });

    getQuery(): Observable<string | undefined> {
        return this.select((state) => state.query);
    }

    getResults(): Observable<SearchResultItem | undefined> {
        return this.select((state) => state.results);
    }

    getErrors(): Observable<string | undefined> {
        return this.select((state) => state.error);
    }

    readonly setQuery = this.updater((state, query: string | undefined) => ({
        ...state,
        query
    }));

    readonly setResults = this.updater((state, results: SearchResultItem | undefined) => ({
        ...state,
        results
    }));

    readonly setErrors = this.updater((state, error: string | undefined) => ({
        ...state,
        error
    }));

   resetResult(): void {
    this.setResults(undefined);
   }

}