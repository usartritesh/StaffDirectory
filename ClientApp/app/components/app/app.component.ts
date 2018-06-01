import { Component } from '@angular/core';
import '../../../../public/css/styles.css';
import { PeopleSearchComponent } from '../search/search.component';
import { PeopleService } from '../services/people.service';
import { HttpModule } from '@angular/http';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    //directives: [PeopleSearchComponent],
    providers: [PeopleService, HttpModule]
})
export class AppComponent { }
