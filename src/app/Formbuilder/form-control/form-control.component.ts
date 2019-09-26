import { Component, OnInit } from '@angular/core';
import {StateControlService} from '../services/state-control.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {
  items = ['INPUT', 'EMAIL', 'PASSWORD', 'CHECKBOX', 'RADIO_GROUP', 'CHECKBOX_GROUP', 'SLIDER', 'TEXTAREA', 'SELECT'];

  constructor(private stateFormService: StateControlService,
              private router: Router) { }

  ngOnInit() {
    console.log(history.state.data);
    // this.stateFormService.formData.next(history.state.data.json);
  }
  createFormControl(item) {
    const event = {
      type: 'addFormControl',
      payload: item,
      formData: history.state.data
    };
    this.stateFormService.eventDispatcher.next(event);
  }
}
