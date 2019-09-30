import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynamicFormArrayModel, DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormArray, FormGroup} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements AfterViewInit, OnInit {
  hasOptions = true;
  formGroup: FormGroup;
  formModel: DynamicFormModel = [];
  showForm = false;
  formArrayControl;
  formArrayModel;

  constructor(private formService: DynamicFormService,
              private router: Router,
              private stateControlService: StateControlService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.stateControlService.dataModel.subscribe(data => {
      this.formGroup = this.formService.createFormGroup(data);
    });
    this.stateControlService.updateContent.subscribe(res => {
      this.formModel = [];
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.stateControlService.dataModel.subscribe(data => {
      this.formModel = data;
      this.formArrayControl = this.formGroup.get('options') as FormArray;
      this.formArrayModel = this.formService.findById('options', this.formModel);
      this.showForm = true;
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
    if (this.formGroup.valid) {
      const event = {
        type: 'addProperties',
        payload: newModel
      };
      this.stateControlService.eventDispatcher.next(event);
      this.formModel = [];
    }
  }

}
