import {AfterViewInit, Component, OnInit} from '@angular/core';
import {JsonStructure} from './models/JsonStructure';
// temp
import {ActivatedRoute} from '@angular/router';
// temp
import {FormGroup} from '@angular/forms';
import {DynamicFormControlEvent, DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, AfterViewInit {
  showFile = false;
  buttonLabel = '';
  showForm = false;
  formGroup: FormGroup;
  formModel: DynamicFormModel = [];
  formData: JsonStructure;

  constructor(
    private formService: DynamicFormService,
    // temp
    private route: ActivatedRoute,
    // temp

  ) {
    // temp
    this.route.queryParams.subscribe(existData => {
      console.log(existData.form);
      if (existData.upload !== '') {
        this.showFile = true ;
        this.buttonLabel = existData.upload;
      }
      this.formData = existData;
      this.formModel = [];
      this.formModel = this.formService.fromJSON(existData.form);
      this.showForm = true;
      this.formGroup = this.formService.createFormGroup(this.formModel);
    });
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    // this.stateControlService.formModel.subscribe(data => {
    //   this.formModel.push(data);
    //   this.formGroup = this.formService.createFormGroup(this.formModel);
    //   this.showForm = true;
    // });
  }

  onBlur(event: DynamicFormControlEvent) {
    console.log(event);
  }

  onChange(event: DynamicFormControlEvent) {
    console.log(event);
  }

  onFocus(event: DynamicFormControlEvent) {
    console.log(event);
  }

  submit(data) {

    console.log(data.getRawValue());
  }
}
