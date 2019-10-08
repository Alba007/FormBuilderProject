import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JsonStructure} from './models/JsonStructure';
import {EventsService} from '../events.service';
// temp
import {ActivatedRoute} from '@angular/router';
// temp
import {FormGroup} from '@angular/forms';
import {DynamicFormLayout, DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import { MY_FORM_LAYOUT} from "./custom-layout";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, AfterViewInit {

  showForm = false;
  formGroup: FormGroup;
  formModel: DynamicFormModel = [];
  pocChange: number;
  formData: JsonStructure;
  formLayout: DynamicFormLayout = MY_FORM_LAYOUT;
  formname = '';

  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() submited: EventEmitter<any> = new EventEmitter();

  constructor(
    private formService: DynamicFormService,
    private event: EventsService,
    // temp
    private route: ActivatedRoute,
    // temp

  ) {
    // temp
    this.route.queryParams.subscribe(existData => {
      this.formData = existData;
      this.formModel = [];
      this.formModel = this.formService.fromJSON(existData.form);
      this.showForm = true;
      this.formGroup = this.formService.createFormGroup(this.formModel);
    });

    // temp
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  addBlurEvent(event) {
    this.blur.next(event);
  }

  addChangeEvent(event) {
    this.change.next(event);
  }

  addFocusEvent(event) {
    this.focus.next(event);
  }

  addSubmitEvent(event) {
    this.focus.next(event);
  }

  submit(data) {

    console.log(data.getRawValue());
  }
}
