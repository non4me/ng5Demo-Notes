import {Component, OnInit, OnDestroy} from '@angular/core';

import {SpinnerService} from '../../services';

/**
 * @description
 * This component provides ability to show spinner which indicates that the application is working
 * (f.e. loading data from web service).
 *
 * @external Component, SpinnerService
 *
 * @external forEach
 * @see {@link https://lodash.com/docs}
 */
@Component({
  selector: 'demo-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  state: Boolean;
  private unsubscribeHelper = [];

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.unsubscribeHelper.push(
      this.spinnerService.getState()
      .subscribe((state) => {
        setTimeout(() => {
          return this.state = !!state
        });
      })
    );
  }


  ngOnDestroy() {
    this.unsubscribeHelper.forEach(service => service.unsubscribe());
  }
}
