import {NO_ERRORS_SCHEMA, Injector} from '@angular/core';
import {TestBed, getTestBed, async, inject} from '@angular/core/testing';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {Observable} from 'rxjs/Observable';
import SpyObj = jasmine.SpyObj;

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of({});
  }
}

describe('AppComponent', () => {
  let fixture;
  let component;
  let translate: TranslateService;
  let injector:  Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        })
      ],
      providers: [
      ],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    injector = getTestBed();
    translate = injector.get(TranslateService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as currentLang 'cz'`, () => {
    expect(component.currentLang).toEqual('cz');
  });


  it(`#changeLang should change current Language`, async(() => {

    component.changeLang({value: 'cz'});
    expect(component.translate.currentLang).toEqual('cz');

    component.changeLang({value: 'en'});
    expect(component.translate.currentLang).toEqual('en');
  }));

});
