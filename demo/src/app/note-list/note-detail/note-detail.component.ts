import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {NotesService, Note} from '../../_core/services';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'demo-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit, OnDestroy {

  id: string;
  note: Note;
  addNoteForm: FormGroup;
  submitted = false;
  isEdit = false;

  private unsubscribeHelper = [];

  constructor(private route: ActivatedRoute, private noteService: NotesService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.addNoteForm = this.fb.group({
      note: ['', [Validators.required]]
    });

    this.unsubscribeHelper.push(
      this.route.paramMap
        .switchMap((params: ParamMap) => {
            this.id = params.get('id');

            return Observable.of(this.id);
          }
        )
        .switchMap(noteId => {
          return this.noteService.getNote(+noteId);
        })
        .subscribe((note: Note) => {
          this.note = note;
          this.addNoteForm.get('note').setValue(note.title);
        })
    );
  }

  updateNote() {
    this.submitted = true;

    if (this.addNoteForm.status === 'VALID') {
      this.note.title = this.addNoteForm.value.note;

      this.unsubscribeHelper.push(
        this.noteService.updateNote(+this.id, this.note.title).subscribe(response => {

          if (response && response.id) {
            this.addNoteForm.reset();
            this.isEdit = false;
            this.submitted = false;

            this.noteService.fetchNoteList();
          }

        })
      );
    }
  }

  deleteNote() {
    this.unsubscribeHelper.push(
      this.noteService.deleteNote(+this.id).then(result => console.log(result))
    );
  }

  ngOnDestroy() {
  }
}
