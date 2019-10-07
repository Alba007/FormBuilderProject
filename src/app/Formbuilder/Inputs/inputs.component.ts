import {Component, OnInit} from '@angular/core';
import {StateControlService} from '../services/state-control.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  items = ['INPUT', 'EMAIL', 'PASSWORD', 'CHECKBOX', 'RADIO_GROUP', 'SLIDER', 'TEXTAREA', 'SELECT'];

  constructor(private stateFormService: StateControlService) {
  }

  ngOnInit() {
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
