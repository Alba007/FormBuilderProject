import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormBuilderComponent} from '../Formbuilder/form-builder.component';
import {FormsComponent} from './forms/forms.component';

const routes: Routes = [
  {path: '', redirectTo: '/allForms', pathMatch: 'full'},
  {path: 'allForms', component: FormsComponent},
  {path: 'createForm', component: FormBuilderComponent, data: {json : 'json'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AllFormsRoutingModule {
}


