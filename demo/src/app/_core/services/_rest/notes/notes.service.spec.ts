import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs/Observable';

import { NotesService } from './notes.service';
import {ErrorHandlerService} from '../../error-handler/error-handler.service';

class FakeErrorHandlerService {
  setMessage() {}
  processServerError(e: any) {
    return Observable.throw(e);
  }
}

describe('NotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NotesService,
        {provide: ErrorHandlerService, useClass: FakeErrorHandlerService}
      ]
    });
  });

  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service).toBeTruthy();
  }));
});
