import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormBuilderComponent} from './Formbuilder/form-builder.component';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormModule} from './Formbuilder/form.module';
import {AllFormsModule} from './all-forms/all-forms.module';
import {AllFormsComponent} from './all-forms/all-forms.component';
import {AllFormsRoutingModule} from './all-forms/all-forms-routing.module';
import {MatDialogModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    AllFormsComponent
  ],
  imports: [
    FormModule,
    AllFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AllFormsRoutingModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
