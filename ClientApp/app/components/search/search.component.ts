import { Component, OnInit} from '@angular/core';
import { PeopleService } from '../services/people.service';
import { Person } from '../model/person';
import { Observable} from 'rxjs';
import {REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import {PersonComponent} from '../person/person.component';

@Component({
  selector: 'search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, PersonComponent]
})
export class PeopleSearchComponent implements OnInit {
  people: Observable<Array<Person>>;
  searchTerm: FormControl;

  constructor(private peopleService: PeopleService) {
    this.searchTerm = new FormControl();
  }

  ngOnInit() {
    this.people = this.peopleService.observedSearch(this.searchTerm.valueChanges, 300);
    
    // trigger the first search
    setTimeout(() => {
      this.searchTerm.updateValue('');
    }, 0);
  
  }

}