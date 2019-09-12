import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NoteListComponent} from './note-list/note-list.component';
import {NoteDetailComponent} from './note-list/note-detail/note-detail.component';

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
  },
  { path: '**', redirectTo: 'notes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
