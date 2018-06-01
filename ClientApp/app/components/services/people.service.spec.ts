import {PeopleService} from './people.service';
import {Person} from '../model/person';
import {
    it,
    inject,
    describe,
    beforeEachProviders,
    expect
} from '@angular/core/testing';
import { provide } from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import { Http, Response, BaseRequestOptions, ResponseOptions } from '@angular/http';
import { ToastsManager } from 'ng2-toastr';

class MockToastManager {
}

describe('Service: PeopleService', () => {
    let service: PeopleService;
    let mockbackend: MockBackend;
    //setup
    beforeEachProviders(() => [
        PeopleService,
        MockBackend,
        BaseRequestOptions,
        provide(ToastsManager, { useClass: MockToastManager }),
        provide(Http, {
            useFactory: (backend, options) => new Http(backend, options),
            deps: [MockBackend, BaseRequestOptions]
        })
    ]);

    beforeEach(inject([MockBackend, PeopleService], (_mockbackend, _service) => {
        mockbackend = _mockbackend;
        service = _service;
    }));

    //specs
    it('search() should return people when called', (done) => {
        let response: { people: Array<Person> } =
            {
                people: [{ id: 1, name: 'bob', img: 'xyz' },
                    { id: 2, name: 'smith', img: 'abc' }]
            };

        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(response) })));
        });
        service.search('test search').subscribe((people: Array<Person>) => {
            expect(people[0].id).toBe(1);
            expect(people[1].name).toBe('smith');
            expect(people.length).toBe(2);
            done();
        });
    });
}) 