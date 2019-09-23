import { Component, OnInit } from '@angular/core';
import { StateControlService } from './services/state-control.service'
import { DynamicFormOptionConfig, DynamicSliderModel, DynamicFormModel, DynamicInputModel, DynamicFormService, DynamicFormArrayModel, DynamicSelectModel, DynamicFormOption } from '@ng-dynamic-forms/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FormBuilderReactive';
  items = ['INPUT', 'EMAIL', 'PASSWORD', 'CHECKBOX', 'RADIO_GROUP', 'CHECKBOX_GROUP', 'SLIDER', 'TEXTAREA', 'SELECT'];
  constructor(
    private stateFormService: StateControlService) {

  }
  ngOnInit() {
  }
  createFormControl(item) {
    const event = {
      type: 'addFormControl',
      payload: item
    };
    this.stateFormService.eventDispatcher.next(event);

  }

}
