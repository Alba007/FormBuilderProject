import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterViewInit {
  showForm = false;
  formGroup: FormGroup;
  formModel: DynamicFormModel = [];

  constructor(private formService: DynamicFormService,
              private stateControlService: StateControlService,
              private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.stateControlService.formModel.subscribe(data => {
        this.formModel.push(data);
        this.formGroup = this.formService.createFormGroup(this.formModel);
        this.showForm = true;
      }
    );
  }

  controlDetails(controlModel) {
    const event = {
      type: 'addFormControl',
      payload: controlModel
    };
    this.stateControlService.eventDispatcher.next(event);
  }

  save(formModel) {
    if (this.formGroup.valid) {
      const json: string = JSON.stringify(formModel);
      console.log(json);
      this.formModel = [];
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.formModel = this.formService.fromJSON(json);
      this.formGroup = this.formService.createFormGroup(this.formModel);
    }
    return;
  }
}
