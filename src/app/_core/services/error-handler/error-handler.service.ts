import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class ErrorHandlerService {

  /**
   * @description
   * Process a server error
   *
   * @param {HttpErrorResponse} error
   *
   * @return  {Observable<throw>}
   */
  processServerError(error: HttpErrorResponse) {
    console.log('processServerError: ', error.statusText);

    return Observable.throw(error)
  }

}
