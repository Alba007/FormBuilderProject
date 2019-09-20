import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PropertiesComponent } from './properties/properties.component';

import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    FormComponent,

  ],
  imports: [
    BrowserModule,
    DynamicFormsMaterialUIModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
