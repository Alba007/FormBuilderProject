import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PropertiesComponent} from './properties/properties.component';
import {DynamicFormsMaterialUIModule} from '@ng-dynamic-forms/ui-material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormComponent} from './form/form.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FormControlComponent} from './form-control/form-control.component';
import {MatCardModule, MatDialogModule, MatIconModule} from '@angular/material';
import {ConfirmationMessageComponent} from './confirmation-message/confirmation-message.component';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [
    PropertiesComponent,
    FormComponent,
    FormControlComponent,
    ConfirmationMessageComponent

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
    MatTooltipModule

  ],
  providers: [],
  exports: [
    FormControlComponent,
    PropertiesComponent,
    FormComponent
  ],
  bootstrap: [FormComponent],
  entryComponents: [ConfirmationMessageComponent]
})
export class FormModule {
}
