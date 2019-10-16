import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {
  showForm = false;
  formGroup: FormGroup;
  formModel: DynamicFormModel = [];
  pocChange: number;
  showFile = false;
  buttonFile = {
    id: '',
    label: '',
    type: 'FILE'
  };
  listId = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formService: DynamicFormService,
              private stateControlService: StateControlService,
              private localStorageService: LocalStorageService) {
    this.listId = [];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(existData => {
      this.formModel = [];
      if (existData.uploadID) {
        this.showFile = true;
        this.buttonFile.id = existData.uploadID;
        this.buttonFile.label = existData.uploadLabel;
      }
      if (existData.form !== '') {
        this.formModel = this.formService.fromJSON(existData.form);
        this.findAllId();
        this.stateControlService.idList.next(this.listId);
      }
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.showForm = true;
    });
  }

  ngAfterViewInit() {
    this.stateControlService.formModel.subscribe(data => {
      this.controlForUplaodButton(data);
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
    this.showFile = false;
    this.localStorageService.newform.next({
      form: JSON.stringify(formModel),
      uploadID: this.buttonFile.id,
      uploadLabel: this.buttonFile.label
    });
    this.formModel = [];
    this.router.navigate(['all-forms']);
  }

  controlForUplaodButton(data) {
    if (data.inputType === 'file') {
      this.showFile = true;
      this.buttonFile.id = data.id;
      this.buttonFile.label = data.label;
    } else {
      this.formModel.push(data);
    }
  }

  deleteOption(controlModel, id) {
    this.listId.splice(this.listId.indexOf(id), 1);
    this.stateControlService.idList.next(this.listId);
    this.pocChange = this.formModel.indexOf(controlModel);
    this.formModel.splice(this.pocChange, 1);
  }

  findAllId() {
    this.listId = [];
    this.formModel.forEach(el => {
      this.listId.push(el.id);
    });
    if (this.buttonFile.id !== '') {
      this.listId.push(this.buttonFile.id);
    }
  }
}
