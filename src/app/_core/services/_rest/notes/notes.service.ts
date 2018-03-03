import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, catchError} from 'rxjs/operators';

import {environment} from '../../../../../environments/environment';
import {ErrorHandlerService} from '../../error-handler/error-handler.service'

export interface Note {
  id: number,
  title: string
}

@Injectable()
export class NotesService {
  private restServer: string = environment.restServer;
  private NOTES = '/notes';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
  }

  /**
   * @description
   * Fetch a list of notes from the restServer
   *
   * @return  {Observable<Note[]>}
   */
  getNoteList(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.restServer}${this.NOTES}`)
      .pipe(
        catchError(error => this.errorHandler.processServerError(error))
      );
  }

  /**
   * @description
   * Fetch a note with certain ID from the restServer
   *
   * @param {number} noteId
   *
   * @return  {Observable<Note>}
   */
  getNote(noteId: number): Observable<Note> {
    return this.http.get<Note>(`${this.restServer}${this.NOTES}/${noteId}`)
      .pipe(
        catchError(error => this.errorHandler.processServerError(error))
      );
  }

  /**
   * @description
   * Post new note to the restServer
   *
   * @param {string} note
   *
   * @return  {Observable<Note>}
   */
  createNote(note: string) {
    const url = `${this.restServer}${this.NOTES}`;
    const newNote = {
      title: note
    };

    return this.http.post<Note>(url, newNote)
      .pipe(
        catchError(error => this.errorHandler.processServerError(error))
      );
  }


  /**
   * @description
   * Update a note with certain ID
   *
   * @param {number} noteId
   * @param {string} note
   *
   * @return  {Observable<Note>}
   */
  updateNote(noteId: number, note: string) {
    const url = `${this.restServer}${this.NOTES}/${noteId}`;
    const changedNote = {
      title: note
    };

    if (!noteId) {
      return Observable.throw('missing noteId');
    }

    return this.http.put<Note>(url, changedNote)
      .pipe(
        catchError(error => this.errorHandler.processServerError(error))
      );
  }

  /**
   * @description
   * Update a note with certain ID
   *
   * @param {number} noteId
   *
   * @return  {Observable<boolean>}
   */
  deleteNote(noteId: number) {
    return this.http.delete<boolean>(`${this.restServer}${this.NOTES}`, {observe: 'response'})
      .pipe(
        map((serverResponse: HttpResponse<null>) => serverResponse.status === 204),
        catchError(error => this.errorHandler.processServerError(error))
      );
  }

}
