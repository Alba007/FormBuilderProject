import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsComponent} from './forms/forms.component';
import {NewFormComponent} from './new-form/new-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {AllFormsComponent} from './all-forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatIcon, MatIconModule } from '@angular/material'  
@NgModule({
  declarations: [FormsComponent, NewFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule, 
    FormsModule,
   BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [FormsComponent],
  bootstrap: [AllFormsComponent],
  entryComponents: [NewFormComponent]

})
export class AllFormsModule { }
