import { Component, Input} from '@angular/core';
import { Person } from '../model/person';

@Component({
  selector: 'person',
  styleUrls: ['./person.component.scss'],
  templateUrl: './person.component.html',
})
export class PersonComponent  {
  @Input() person: Person;

  constructor() {
  }

}