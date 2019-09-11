import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {NotesService, Note} from '../_core/services';

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

  private unsubscribeHelper = [];

  constructor(private noteService: NotesService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.addNoteForm = this.fb.group({
      note: ['', [Validators.required]]
    });

    this.unsubscribeHelper.push(
      this.noteService.getNoteList()
        .subscribe(serverNoteList => {
          this.noteList = serverNoteList as Note[];
        })
    );

    this.noteService.fetchNoteList();
  }

  addNote() {
    this.submitted = true;

    if (this.addNoteForm.status === 'VALID') {
      const newNote = this.addNoteForm.value;

      this.unsubscribeHelper.push(
        this.noteService.createNote(newNote).subscribe(response => {

          if (response && response.id) {
            this.addNoteForm.reset();
            this.showAddForm = false;
            this.submitted = false;

            this.noteService.fetchNoteList();
          }

        })
      );
    }
  }

  ngOnDestroy() {
    this.unsubscribeHelper.forEach(service => service.unsubscribe());
  }
}
