import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { SpinnerService } from '@_core/services/spinner/spinner.service';
import { InterceptorSpinner } from './interceptor-spinner';

class FakeSpinnerService {
  show() {
    return 'ShowOK';
  }

  hide() {
    return 'HideOK';
  }
}

describe('Lang-interceptor.service', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorSpinner,
        multi: true
      },
      {
        provide: SpinnerService, useClass: FakeSpinnerService
      }
    ]
  }));

  describe('interceptor', () => {
    it('should manage status with successful request', inject([HttpClient, HttpTestingController, SpinnerService],
      (http: HttpClient, mock: HttpTestingController, spinner: SpinnerService) => {

        const spyOnShow = spyOn(spinner, 'show');
        const spyOnHide = spyOn(spinner, 'hide');

        http.get('/api').subscribe();
        const request = mock.expectOne('/api');
        request.flush(null);

        expect(spyOnShow.calls.count()).toBe(1, 'show');
        expect(spyOnHide.calls.count()).toBe(1, 'hide');
      }));
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
