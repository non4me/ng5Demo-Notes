import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SpinnerService } from '@_core/services/spinner/spinner.service';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  const fakeSpinnerService = {
    getState: () => {
      return of(true);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      providers: [
        { provide: SpinnerService, useValue: fakeSpinnerService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show and hide spinner', () => {
    const spinner = fixture.nativeElement.querySelector('.dispo-spinner');
    expect(spinner).toBeTruthy();
    component.showSpinner = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dispo-spinner')).toBeNull();
  });
});
