import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormBuilderComponent} from './Formbuilder/form-builder.component';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormModule} from './Formbuilder/form.module';
import {AllFormsModule} from './DisplayForm-Test/all-forms.module';
import {AllFormsComponent} from './DisplayForm-Test/all-forms.component';
import {AllFormsRoutingModule} from './DisplayForm-Test/all-forms-routing.module';
import {MatCardModule, MatDialogModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    AllFormsComponent,
  ],
  imports: [
    FormModule,
    AllFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AllFormsRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
