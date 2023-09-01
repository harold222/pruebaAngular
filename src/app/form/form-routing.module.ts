import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowFormComponent } from './show-form/show-form.component';

const routes: Routes = [
  {
    path: ':id',
    component: ShowFormComponent,
  },
  {
    path: '',
    component: ShowFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
