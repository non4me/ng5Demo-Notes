import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {NoteDetailComponent} from './note-detail.component';
import {NotesService} from 'app/_core/services';


class FakeNotesService {
  fetchNoteList() {
    return true;
  }

  getNote() {
    return 'Note';
  }

  createNote() {
    return 'noteCreated';
  }
}

class FakeTranslateService {
  get(key: any): any {
    return Observable.of(key);
  }
}

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of({});
  }
}

describe('NoteDetailComponent', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        }),
        RouterTestingModule
      ],
      providers: [
        {provide: NotesService, useClass: FakeNotesService}
      ],
      declarations: [NoteDetailComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
