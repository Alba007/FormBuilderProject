import { Component, OnInit, Input } from '@angular/core';
import { DynamicFormService, DynamicFormModel, DynamicFormArrayModel } from '@ng-dynamic-forms/core';
import { FormGroup, FormArray } from '@angular/forms';
import { StateControlService} from '../services/state-control.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  hasOptions = true;
  formGroup: FormGroup
  formModel: DynamicFormModel = [];
  showForm = false;
  formArrayControl;
  formArrayModel;
  constructor(private formService: DynamicFormService,
    private stateControlService: StateControlService) {
  }

  ngOnInit() {
    this.stateControlService.dataModel.subscribe(data => {
      this.formGroup = this.formService.createFormGroup(data);
      this.formModel = data;
      this.showForm = true;
      this.formArrayControl = this.formGroup.get("options") as FormArray;
      this.formArrayModel = this.formService.findById("options", this.formModel)
      this.hasOptions = this.formArrayControl != null;
    });

  }
  removeItem(context: DynamicFormArrayModel, index: number) {
    this.formService.removeFormArrayGroup(index, this.formArrayControl, context);
  }

  insertItem(context: DynamicFormArrayModel, index: number) {
    this.formService.insertFormArrayGroup(index, this.formArrayControl, context);
  }
  save(newModel) {
    const event = {
      type: 'addProperties',
      payload: newModel
    };
    // console.log(newModel)
    this.stateControlService.eventDispatcher.next(event);
    this.formModel = [];
  }
}
