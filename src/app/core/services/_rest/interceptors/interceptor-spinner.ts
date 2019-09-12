import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { SpinnerService } from '@_core/services/spinner/spinner.service';

@Injectable()
export class InterceptorSpinner implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = req.clone();
    this.spinner.show();

    return next.handle(cloneReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),
      catchError((err) => {
        this.spinner.hide();

        return throwError(err);
      })
    );
  }
}
