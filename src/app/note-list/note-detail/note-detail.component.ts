import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute } from '@angular/router';

import { Note, NotesService } from '@_core/services/_rest/notes/notes.service';

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

  constructor(private route: ActivatedRoute, private noteService: NotesService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.addNoteForm = this.fb.group({
      note: ['', [Validators.required]]
    });

    this.route.paramMap
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        this.id = params.get('id');
        this.noteService.getNote(this.id).then((note: Note) => {
          this.note = note;
          this.addNoteForm.get('note').setValue(note.title);
        });
      });
  }

  updateNote() {
    this.submitted = true;

    if (this.addNoteForm.status === 'VALID') {
      this.note.title = this.addNoteForm.value.note;

      this.noteService.updateNote(+this.id, this.note.title).then(response => {

        if (response && response.id) {
          this.addNoteForm.reset();
          this.isEdit = false;
          this.submitted = false;

          this.noteService.fetchNoteList();
        }

      });
    }
  }

  deleteNote() {
    this.noteService.deleteNote(+this.id);
  }

  ngOnDestroy() {
  }
}
