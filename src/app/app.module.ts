import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormBuilderComponent} from './Formbuilder/form-builder.component';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormModule} from './Formbuilder/form.module';
<<<<<<< HEAD
import { AllFormsModule } from './all-forms/all-forms.module';
=======
import {AllFormsModule} from './all-forms/all-forms.module';
import {AllFormsComponent} from './all-forms/all-forms.component';
>>>>>>> d67423dca76c66505f81c4a8b5cebfeecf97e045

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
    AllFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
