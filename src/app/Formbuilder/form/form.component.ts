import {AfterViewInit, Component} from '@angular/core';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JsonStructure} from '../../DisplayForm-Test/models/JsonStructure';
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
  showFile = false;
  buttonLabel = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formService: DynamicFormService,
              private stateControlService: StateControlService,
              private localStorageService: LocalStorageService) {
    this.route.queryParams.subscribe(existData => {
      this.formData = existData;
      this.formModel = [];
      if (existData.upload !== '') {
        this.showFile = true;
        this.buttonLabel = existData.upload;
      }
      if (existData.form !== '') {
        this.formModel = this.formService.fromJSON(existData.form);
        this.showForm = true;
      }
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.formGroup.disable();
    });
  }

  ngAfterViewInit() {
    this.stateControlService.formModel.subscribe(data => {
      this.controlForUplaodButton(data);
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.showForm = true;
      this.formGroup.disabled;

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
    this.showFile = false;
    this.localStorageService.newform.next({
      form: JSON.stringify(formModel),
      upload: this.buttonLabel
    });
    this.formModel = [];
    this.router.navigate(['all-forms']);
  }

  controlForUplaodButton(data) {
    if (data.inputType === 'file') {
      this.showFile = true;
      this.buttonLabel = data.label;
    } else {
      this.formModel.push(data);
    }
  }
}
