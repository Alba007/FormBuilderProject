import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms/forms.component';
import { NewFormComponent } from './new-form/new-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { AllFormsComponent} from './all-forms.component';
import {FormComponent} from "../Formbuilder/form/form.component";

@NgModule({
  declarations: [FormsComponent, NewFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
  ],
  exports: [FormsComponent],
  bootstrap: [AllFormsComponent],
  entryComponents: [NewFormComponent]

})
export class AllFormsModule { }
