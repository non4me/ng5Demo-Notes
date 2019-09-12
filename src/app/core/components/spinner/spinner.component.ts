import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { SpinnerService } from '@_core/services/spinner/spinner.service';

/**
 * @description
 * This component provides ability to show spinner which indicates that the application is working
 * (f.e. loading data from web service).
 */
@Component({
  selector: 'demo-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  showSpinner = false;

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.getState().pipe(untilDestroyed(this)).subscribe(state => this.showSpinner = !!state);
  }

  ngOnDestroy() {
  }
}
