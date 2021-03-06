import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'environments/environment';
import { ErrorHandlerService } from '@_core/services/error-handler/error-handler.service';


export interface Note {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  noteList$ = new BehaviorSubject(null);

  private restServer = environment.restServer;
  private NOTES = '/notes';

  constructor(private http: HttpClient) {
  }

  getNoteList(): Observable<Note[]> {
    return this.noteList$.asObservable();
  }

  fetchNoteList() {
    this.http.get<Note[]>(`${this.restServer}${this.NOTES}`)
      .toPromise()
      .then(response => this.noteList$.next(response))
      .catch(error => ErrorHandlerService.processServerError(error));
  }

  getNote(noteId: string): Promise<Note> {
    return this.http.get<Note>(`${this.restServer}${this.NOTES}/${noteId}`)
      .toPromise();
  }

  createNote(title: string): Promise<any> {
    const url = `${this.restServer}${this.NOTES}`;

    return this.http.post<Note>(url, { title })
      .toPromise()
      .catch(error => ErrorHandlerService.processServerError(error));
  }

  updateNote(noteId: number, title: string): Promise<any> {
    const url = `${this.restServer}${this.NOTES}/${noteId}`;
    const changedNote = { title };

    return this.http.put<Note>(url, changedNote)
      .toPromise()
      .catch(error => ErrorHandlerService.processServerError(error));
  }

  deleteNote(noteId: number): Promise<any> {
    return this.http.delete<boolean>(`${this.restServer}${this.NOTES}`, { params: { id: `${noteId}` } })
      .toPromise()
      .catch(error => ErrorHandlerService.processServerError(error));
  }

}
