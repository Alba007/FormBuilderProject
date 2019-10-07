import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsComponent} from './forms/forms.component';
import {NewFormComponent} from './new-form/new-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule, MatIconModule, MatCardModule, MatTooltipModule} from '@angular/material';
import {DisplayFormModule} from '../display-form/display-form.module';
import {AllFormsRoutingModule} from './all-forms-routing.module';

@NgModule({
  declarations: [FormsComponent, NewFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    DisplayFormModule,
    AllFormsRoutingModule,
  ],
  exports: [FormsComponent],
  bootstrap: [FormsComponent],
  entryComponents: [NewFormComponent]
})

export class AllFormsModule { }
