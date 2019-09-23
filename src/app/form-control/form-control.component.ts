import { Component, OnInit } from '@angular/core';
import {StateControlService} from '../services/state-control.service';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {
  items = ['INPUT', 'EMAIL', 'PASSWORD', 'CHECKBOX', 'RADIO_GROUP', 'CHECKBOX_GROUP', 'SLIDER', 'TEXTAREA', 'SELECT'];

  constructor(private stateFormService: StateControlService) { }

  ngOnInit() {
  }
  createFormControl(item) {
    const event = {
      type: 'addFormControl',
      payload: item
    };
    this.stateFormService.eventDispatcher.next(event);

  }
}
