import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

/**
 * @description
 * This service provides ability to manipulate with spinner state
 *
 * @external Injectable, Observable
 * @external of
 */
@Injectable()
export class SpinnerService {

  private counter = 0;
  private notifier$ = new BehaviorSubject<number>(0);

  /**
   * @description
   * Function which returns actual state
   *
   * @returns {Observable<Boolean>} - actual state Observable object (subscribers of this object are notified about state change)
   */
  getState(): Observable<number> {
    return this.notifier$.asObservable();
  }

  /**
   * @description
   * Show spinner and up counter
   */
  show() {
    this.counter += 1;
    this.setState()
  }

  /**
   * @description
   * Hide spinner if counter equal null
   */
  hide() {
    this.counter -= 1;

    if (this.counter < 1) {
      this.counter = 0;
      this.setState();
    }
  }

  /**
   * @description
   * Update Observable object
   *
   * @param {boolean} state
   */
  private setState(): void {
    console.log('sppiner state', this.counter);
    this.notifier$.next(this.counter);
  }
}
