import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let fixture;
  let component;
  let translate: TranslateService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useValue: {getTranslation: () => of({})} }
        })
      ],
      providers: [],
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

    component.changeLang({ value: 'cz' });
    expect(component.translate.currentLang).toEqual('cz');

    component.changeLang({ value: 'en' });
    expect(component.translate.currentLang).toEqual('en');
  }));

});
