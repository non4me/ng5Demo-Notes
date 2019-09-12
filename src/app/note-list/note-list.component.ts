import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { Note, NotesService } from '@_core/services/_rest/notes/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {

  noteList = [];
  addNoteForm: FormGroup;
  showAddForm = false;
  submitted = false;

  constructor(
    private readonly noteService: NotesService,
    private readonly router: Router,
    private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.addNoteForm = this.fb.group({
      note: ['', [Validators.required]]
    });

    this.noteService.getNoteList()
      .pipe(untilDestroyed(this))
      .subscribe(serverNoteList => {
        this.noteList = serverNoteList as Note[];

        if (Array.isArray(serverNoteList) && serverNoteList.length) {
          this.router.navigate(['notes', serverNoteList[0].id]);
        }
      });

    this.noteService.fetchNoteList();
  }

  addNote() {
    this.submitted = true;

    if (this.addNoteForm.status === 'VALID') {
      const newNote = this.addNoteForm.value;

      this.noteService.createNote(newNote).then(response => {

        if (response && response.id) {
          this.addNoteForm.reset();
          this.showAddForm = false;
          this.submitted = false;

          this.noteService.fetchNoteList();
        }
      });
    }
  }

  ngOnDestroy() {
  }
}
