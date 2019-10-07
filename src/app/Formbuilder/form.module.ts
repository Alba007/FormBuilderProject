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
import {MatCardModule, MatDialogModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    PropertiesComponent,
    FormComponent,
    InputsComponent

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
    MatDialogModule
  ],
  providers: [],
  exports: [
    InputsComponent,
    PropertiesComponent,
    FormComponent,
    InputsComponent
  ],
  bootstrap: [FormComponent]
})
export class FormModule {
}
