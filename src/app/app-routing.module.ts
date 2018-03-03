import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NoteListComponent} from 'app/note-list/note-list.component';
import {NoteDetailComponent} from 'app/note-list/note-detail/note-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full'
  },
  {
    path: 'notes',
    component: NoteListComponent,
    children: [
      {
        path: ':id',
        component: NoteDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
