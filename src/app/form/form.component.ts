import { Component, OnInit } from '@angular/core';
import { DynamicFormModel, DynamicFormService, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { StateControlService } from '../services/state-control.service';

import { of } from 'rxjs';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  showForm = false;
  formGroup: FormGroup
  formModel: DynamicFormModel = [];
  constructor(private formService: DynamicFormService,
    private stateControlService: StateControlService) { }

  ngOnInit() {
    this.stateControlService.formModel.subscribe(data => {
      this.formModel.push(data)
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.showForm = true;
    }
    )
  }
  controlDetails(controlModel) {
    console.log(controlModel)
    const event = {
      type: 'addFormControl',
      payload: controlModel
    };
    this.stateControlService.eventDispatcher.next(event)
    
  }
  save(formModel) {
    let json: string = JSON.stringify(formModel);
    console.log(json)
    this.formModel= []
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.formModel = this.formService.fromJSON(json);
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }
}
