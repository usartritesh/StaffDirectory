import {
  it,
  inject,
  describe,
  beforeEachProviders,
  expect
} from '@angular/core/testing';
import { PeopleSearchComponent } from './search.component';
import { PeopleService } from '../services/people.service';
import { provide } from '@angular/core';
import { Person } from '../model/person';
import {Observable} from 'rxjs';
import { Http } from '@angular/http';
import { ToastsManager } from 'ng2-toastr';


class MockToastManager {
}

class MockHttp {
}

class MockPeopleService  {
  private searchUrl = '';
  observedSearch(terms) {
    // return a list of people whenever terms is updated
    return terms.map(terms => [{ id: 1 }, { id: 2 }]);
  }
}

describe('Component: Search', () => {
  let search : PeopleSearchComponent;
  beforeEachProviders(() => [
    PeopleSearchComponent,
    provide(PeopleService, { useClass: MockPeopleService }),
    provide(Http, { useClass: MockHttp }),
    provide(ToastsManager, { useClass: MockToastManager })
  ]);
  
  beforeEach(inject([PeopleSearchComponent], (_search : PeopleSearchComponent) => {
      search = _search;
  }));

  it('People should be populated after a search', (done) => {
    search.ngOnInit();
    search.searchTerm.updateValue('Bob');
    search.people.subscribe(value => {
      expect(value).toBeDefined();
      expect(value.length).toEqual(2);
      done();
    });
  });

  it('Search term should be set to an empty string after ngOninit', (done) => {
    search.ngOnInit();
    search.searchTerm.valueChanges.subscribe((value => {
      expect(value).toEqual('');
      done();
    }));
  });
  
});
