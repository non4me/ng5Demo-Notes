import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {SpinnerComponent} from './spinner.component';
import {SpinnerService} from '../../services';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  const fakeSpinnerService = {
    getState: () => Observable.of(true)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      providers: [
        {provide: SpinnerService, useValue: fakeSpinnerService}
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


  xit('should be initialize with state = TRUE', () => {
    expect(component.state).toBe(true);
  });

  xit('should show and hide spinner', () => {
    const spinner = fixture.nativeElement.querySelector('.dispo-spinner');
    expect(spinner).toBeTruthy();
    component.state = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dispo-spinner')).toBeNull();
  });

  it('should use unsubscribe method after component is destroyed', () => {
    let unsubscribed = false;
    component['unsubscribeHelper'].push({
      unsubscribe: () => {unsubscribed = true}
    });
    fixture.destroy();
    expect(unsubscribed).toBe(true);
  });
});
