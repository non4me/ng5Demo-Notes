import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerService {

  static processServerError(error: HttpErrorResponse): Observable<never> {
    console.log('processServerError: ', error.statusText);

    return throwError(error);
  }

}
