import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * @description
 * This service provides ability to manipulate with spinner state
 */
@Injectable()
export class SpinnerService {

  private counter = 0;
  private notifier$ = new BehaviorSubject<number>(0);

  getState(): Observable<number> {
    return this.notifier$.asObservable();
  }

  show() {
    this.counter += 1;
    this.setState();
  }

  hide() {
    this.counter -= 1;

    if (this.counter < 1) {
      this.counter = 0;
      this.setState();
    }
  }

  private setState(): void {
    this.notifier$.next(this.counter);
  }
}
