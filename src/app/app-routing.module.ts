import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroCreateComponent } from './libro/libro-create/libro-create.component';
import { LibroListComponent } from './libro/libro-list/libro-list.component';

const routes: Routes = [
  { path: '', component: LibroListComponent },
  { path: 'create', component: LibroCreateComponent },
  {
    path: 'edit/:bookId',
    component: LibroCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
