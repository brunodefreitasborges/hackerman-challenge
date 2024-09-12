import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DetailsResponse, SearchResult } from "./search.model";

@Injectable({
    providedIn: 'root',
  })
  export class SearchService {
    
    constructor(private http: HttpClient) {}

    search(query: string): Observable<SearchResult> {
        return this.http.get<SearchResult>(`https://swapi.dev/api/people/?search=${query}`);
    }

    fetchDetails(url: string): Observable<DetailsResponse> {
      return this.http.get<DetailsResponse>(`${url}`);
    }
  }