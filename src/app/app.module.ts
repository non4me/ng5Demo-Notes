import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NotesService } from '@_core/services/_rest/notes/notes.service';
import { SpinnerService } from '@_core/services/spinner/spinner.service';
import { SpinnerComponent } from '@_core/components/spinner/spinner.component';
import { ErrorHandlerService } from '@_core/services/error-handler/error-handler.service';
import { InterceptorSpinner } from '@_core/services/_rest/interceptors/interceptor-spinner';
import { NoteDetailComponent } from './note-list/note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModules } from './material.module';
import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteDetailComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MaterialModules,
    FlexLayoutModule
  ],
  providers: [
    ErrorHandlerService,
    NotesService,
    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorSpinner,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
