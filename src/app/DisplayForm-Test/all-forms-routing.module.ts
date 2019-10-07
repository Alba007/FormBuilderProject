import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormBuilderComponent} from '../Formbuilder/form-builder.component';
import {FormsComponent} from './forms/forms.component';
import { DisplayComponent } from '../display-form/display/display.component';

const routes

: Routes = [
  {path: '', redirectTo: '/forms', pathMatch: 'full'},
  {path: 'forms', component: FormsComponent},
  {path: 'createForm', component: FormBuilderComponent, data: {json : 'json'} },
  {path: 'display', component: DisplayComponent, data: {json : 'json'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AllFormsRoutingModule {
}


