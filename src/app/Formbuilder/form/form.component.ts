import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';
import {Router} from '@angular/router';
import {JsonStructure} from '../../all-forms/models/JsonStructure';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterViewInit {
  showForm = false;
  formGroup: FormGroup;
  formModel: DynamicFormModel = [];
  pocChange: number;
  formData: JsonStructure;

  constructor(private formService: DynamicFormService,
              private stateControlService: StateControlService,
              private cd: ChangeDetectorRef,
              private router: Router,
              private localStorageService: LocalStorageService) {
    this.stateControlService.formData.subscribe(t => {
      this.formData = t
      this.formModel = this.formService.fromJSON(t.form);
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.showForm = true;

    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.stateControlService.formModel.subscribe(data => {
      this.formModel.push(data);
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.showForm = true;
    });
    this.stateControlService.edit.subscribe(edit => {
      this.formModel[this.pocChange] = edit;
      this.formGroup = this.formService.createFormGroup(this.formModel);

    });
  }

  controlDetails(controlModel) {
    const event = {
      type: 'addFormControl',
      payload: controlModel
    };
    this.pocChange = this.formModel.indexOf(controlModel);
    this.stateControlService.eventDispatcher.next(event);
  }

  save(formModel) {
    if (this.formGroup.valid) {
      const json: string = JSON.stringify(formModel);
      this.formData.form = json;
      this.localStorageService.newform.next(this.formData);
      this.formModel = [];
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.router.navigate(['allForms']);
    }
    return;
  }
}
