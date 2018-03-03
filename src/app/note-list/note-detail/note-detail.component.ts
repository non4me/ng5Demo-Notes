import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap'

import {NotesService, Note} from '../../_core/services';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'demo-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit, OnDestroy {

  note: Note;

  private unsubscribeHelper = [];

  constructor(private route: ActivatedRoute, private notes: NotesService) {
  }

  ngOnInit() {
    this.unsubscribeHelper.push(
      this.route.paramMap
        .switchMap((params: ParamMap) => {
            const id = params.get('id');
            console.log('id: ', id);

            return Observable.of(id);
          }
        )
        .switchMap(noteId => {
          return this.notes.getNote(+noteId)
        })
        .subscribe((note: Note) => this.note = note)
    );
  }

  ngOnDestroy() {
    this.unsubscribeHelper.forEach(service => service.unsubscribe());
  }
}
