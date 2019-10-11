import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PropertiesComponent} from './properties/properties.component';
import {DynamicFormsMaterialUIModule} from '@ng-dynamic-forms/ui-material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormComponent} from './form/form.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {InputsComponent} from './Inputs/inputs.component';
import {MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {FormsComponent} from '../DisplayForm-Test/forms/forms.component';
import {DISABLED_MATCHER, HIDDEN_MATCHER, REQUIRED_MATCHER} from '@ng-dynamic-forms/core';

@NgModule({
  declarations: [
    PropertiesComponent,
    FormComponent,
    InputsComponent,
  ],
  imports: [
    BrowserModule,
    DynamicFormsMaterialUIModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    RouterModule.forRoot([
      {path: 'all-forms', component: FormsComponent}
    ]),
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [DISABLED_MATCHER,
              HIDDEN_MATCHER,
              REQUIRED_MATCHER],
  exports: [
    InputsComponent,
    PropertiesComponent,
    FormComponent
  ],
  bootstrap: [FormComponent]
})
export class FormModule {
}
