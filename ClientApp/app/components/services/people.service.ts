import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Person } from '../model/person';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';


@Injectable()
export class PeopleService {
  private searchUrl = 'api/people/search';

  constructor(private http: Http, private toastr : ToastsManager) {}
  
  // Performs a search by watching a search terms observable.   
  // The server will only be called when :
  // 1. The value has not changed in the last few ms ( debounce())
  // 2. The value has changed to a new value, different from the last (distinctUntilChanged())
  //
  // In addition, any previous pending searches will be cancelled before the new search is made (switchMap()).
  // This ensures that the newest search result matches the latest search terms.
  public observedSearch(searchTerms : Observable<string>, debounceTime : number = 300) : Observable<Person[]> {
       return searchTerms.debounceTime(debounceTime)
                .distinctUntilChanged()
                .switchMap(term => this.search(term))
                .retry(); // keep observable alive in case of failures
  }


  public search(searchTerm: string) : Observable<Person[]> {
    return this.http.get(`${this.searchUrl}/${searchTerm}`)
      .map(this.extractData)
      .catch(err => this.handleError(err));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.people;
  }

  private handleError(error: any) {
    let errMsg = 'An error has occured whilst retrieving data';
    console.error(errMsg);
    this.toastr.error(errMsg, 'Error!');
    return Observable.throw(errMsg);
  }
  
};
