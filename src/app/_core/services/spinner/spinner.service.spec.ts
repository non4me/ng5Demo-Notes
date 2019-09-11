import {TestBed, inject} from '@angular/core/testing';

import {SpinnerService} from './spinner.service';

describe('SpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService]
    });
  });

  it('should be created',
    inject([SpinnerService], (service: SpinnerService) => {
      expect(service).toBeTruthy();
    }));

  it('#show() should show spinner',
    inject([SpinnerService], (service: SpinnerService) => {
      service.show();
      service.getState().subscribe((state) => {
        expect(state).toBe(1);
      });
    }));

  it('#hide() should hide spinner',
    inject([SpinnerService], (service: SpinnerService) => {
      service.show();
      service.hide();
      service.getState().subscribe((state) => {
        expect(state).toBe(0);
      });
    }));
});
