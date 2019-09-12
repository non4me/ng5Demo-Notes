import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { NO_ERRORS_SCHEMA } from '@angular/core';


import { NotesService } from '@_core/services/_rest/notes/notes.service';
import { NoteListComponent } from './note-list.component';

class FakeNotesService {
  fetchNoteList() {
    return true;
  }

  getNoteList(key: any): any {
    return of(key);
  }

  createNote(key: any): any {
    return of(key);
  }
}


describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useValue: {getTranslation: () => of({})} }
        }),
        ReactiveFormsModule
      ],
      declarations: [NoteListComponent],
      providers: [
        {provide: NotesService, useClass: FakeNotesService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
