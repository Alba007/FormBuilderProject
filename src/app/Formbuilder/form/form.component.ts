import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formService: DynamicFormService,
              private stateControlService: StateControlService,
              private cd: ChangeDetectorRef,
              private localStorageService: LocalStorageService) {
    this.route.queryParams.subscribe(existData => {
      this.formData = existData;
      if (existData.form !== '') {
        this.formModel = this.formService.fromJSON(existData.form);
        this.showForm = true;
      } else {
        this.formModel = [];
      }
      this.formGroup = this.formService.createFormGroup(this.formModel);

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
    console.log(controlModel)
    const event = {
      type: 'addFormControl',
      payload: controlModel
    };
    this.pocChange = this.formModel.indexOf(controlModel);
    this.stateControlService.eventDispatcher.next(event);
  }

  save(formModel) {
    if (this.formGroup.valid) {
      this.localStorageService.newform.next({
        name: this.formData.name,
        description: this.formData.description,
        form: JSON.stringify(formModel)
      });
      this.formModel = [];
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.router.navigate(['allForms']);
    }
    return;
  }

  delete(controlModel) {
    const posToDelete = this.formModel.indexOf(controlModel);
    this.formModel.splice(posToDelete);
    console.log(controlModel);
  }
}
