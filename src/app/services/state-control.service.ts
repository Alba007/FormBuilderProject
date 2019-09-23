import {Injectable} from '@angular/core';
import {of, Subject} from 'rxjs';
import {
  DynamicCheckboxGroupModel,
  DynamicCheckboxModel,
  DynamicFormArrayModel,
  DynamicFormControlModel,
  DynamicFormModel,
  DynamicFormService,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicSelectModel,
  DynamicSliderModel,
  DynamicTextAreaModel
} from '@ng-dynamic-forms/core';
import {Event} from '../event';

@Injectable({
  providedIn: 'root'
})
export class StateControlService {
  object: any;
  control: string;
  eventDispatcher = new Subject<Event>();
  dataModel = new Subject<DynamicFormModel>();
  formModel = new Subject<DynamicFormControlModel>();
  map = new Map();

  constructor(private formService: DynamicFormService) {
    this.map.set('INPUT', {
      id: 'text',
      label: 'text',
      maxLength: 'number',
      placeholder: 'text',
      required: 'Boolean'
    });
    this.map.set('EMAIL', {
      id: 'text',
      label: 'text',
      maxLength: 'number',
      placeholder: 'text',
      validators: {
        required: 'Boolean'
      }
    });
    this.map.set('PASSWORD', {
      id: 'text',
      label: 'text',
      minLength: 'number',
      placeholder: 'text',
      required: 'Boolean'
    });
    this.map.set('CHECKBOX', {
      id: 'text',
      label: 'text',
      required: 'Boolean'
    });
    this.map.set('RADIO_GROUP', {
      id: 'text',
      label: 'text',
      options:
        [{
          label: 'text',
          value: 'text'
        }],
      required: 'Boolean'
    });

    this.map.set('CHECKBOX_GROUP', {
      id: 'text',
      label: 'text',
      options:
        [{
          id: 'text',
          label: 'text'
        }],
      required: 'Boolean'
    });

    this.map.set('SLIDER', {
      id: 'text',
      min: 'number',
      max: 'number',
      vertical: 'Boolean',
      required: 'Boolean'
    });

    this.map.set('TEXTAREA', {
      id: 'text',
      label: 'text',
      required: 'Boolean'
    });

    this.map.set('SELECT', {
      id: 'text',
      label: 'text',
      options:
        [{
          label: 'text',
          value: 'text'
        }],
      required: 'Boolean'
    });

    this.eventDispatcher.subscribe((data: Event) => this.createProperties(data));
  }

  createProperties(data: Event) {
    switch (data.type) {
      case 'addFormControl':
        this.onAddFormControl(data);
        break;
      case 'addProperties':
        this.onAddProperties(data);
        break;
    }
  }

  onAddFormControl(data: Event) {
    const formControl: DynamicFormModel = [];
    let pair;
    data.payload.type ? pair = this.map.get(data.payload.type) : pair = this.map.get(data.payload);
    let valueOfControl;
    this.control = data.payload;
    let req;
    for (const controlValues in pair) {
      controlValues === 'id' ? req = true : req = null;
      valueOfControl = data.payload[controlValues];
      if (pair[controlValues] === 'number' || pair[controlValues] === 'text') {
        formControl.push(new DynamicInputModel({
          id: controlValues,
          label: controlValues,
          inputType: pair[controlValues],
          value: valueOfControl,
          required: req,
        }));
      } else {
        if (pair[controlValues] === 'Boolean') {
          formControl.push(new DynamicCheckboxModel({
            id: controlValues,
            label: controlValues
          }));
        }
      }
      if (controlValues === 'options' || controlValues === 'group') {
        debugger;
        let length;
        let attr = '_' + controlValues;
        data.payload[attr] ? length = data.payload[attr].length : length = 3;
        if (data.payload[attr]) {
          console.log(data.payload, 'test');
          let i = -1;
          formControl.push(new DynamicFormArrayModel({
            id: controlValues,
            initialCount: length,
            groupFactory: () => {
              return [
                new DynamicInputModel({
                  id: 'myInput',
                  label: 'Input',
                  value: (i < length && i >= 0) ? data.payload[attr][i++].value : i++
                })];
            }
          }));
        } else {
          formControl.push(new DynamicFormArrayModel({
            id: controlValues,
            initialCount: length,
            groupFactory: () => {

              return [
                new DynamicInputModel({
                  id: 'myInput',
                  label: '',
                  value: ''
                })];
            }
          }));
        }
      }
      if (controlValues === 'validators') {
        for (const x in pair[controlValues]) {
          formControl.push(new DynamicFormArrayModel({
            id: 'validators',
            initialCount: 1,
            groupFactory: () => {
              return [
                new DynamicCheckboxModel({
                  id: x,
                  label: x
                })];
            }
          }));
        }
      }

    }
    this.dataModel.next(formControl);
  }

  onAddProperties(data) {
    let attr = '';
    this.object = {id: ''};
    if (this.control === 'SELECT') {
      attr = 'options';
      this.object[attr] = of([]);
    }
    data.payload.forEach(element => {
      if (element.type === 'ARRAY') {
        switch (element.id) {
          case 'validators':
            attr = 'validators';
            this.object[attr] = {};
            element.groups.forEach(ell => {
              const id = ell.group[0].id;
              const a = this.object[attr];
              a[id] = ell.group[0].value;
            });
            break;
          case 'options':
            attr = 'options';
            this.object[attr] = [];
            attr = 'group';
            this.object[attr] = [];
            element.groups.forEach(arrayElement => {
              const optObject = {
                id: arrayElement.group[0]._value,
                label: arrayElement.group[0]._value,
                value: arrayElement.group[0]._value
              };
              if (this.control === 'CHECKBOX_GROUP') {
                this.object[attr].push(new DynamicCheckboxModel(
                  optObject
                ));
              } else {
                attr = 'options';
                this.object[attr].push(optObject);
              }
            });
            break;
        }
      } else {
        this.object[element.id] = element._value;
      }
    });
    let form;
    switch (this.control) {
      case 'INPUT':
        form = new DynamicInputModel(
          this.object
        );
        break;
      case 'EMAIL':
        attr = 'email';
        this.object[attr] = 'email';
        form = new DynamicInputModel(
          this.object
        );
        break;
      case 'SELECT':
        form = new DynamicSelectModel<string>(
          this.object
        );
        break;
      case 'PASSWORD':
        attr = 'password';
        this.object[attr] = 'password';
        form = new DynamicInputModel(
          this.object
        );
        break;
      case 'CHECKBOX':
        form = new DynamicCheckboxModel(
          this.object);
        break;
      case 'RADIO_GROUP':
        form = new DynamicRadioGroupModel<string>(
          this.object
        );
        break;
      case 'CHECKBOX_GROUP':
        form = new DynamicCheckboxGroupModel(
          this.object
        );
        break;
      case 'SLIDER':
        form = new DynamicSliderModel(
          this.object
        );
        break;
      case 'TEXTAREA':
        form = new DynamicTextAreaModel(this.object);
        break;
    }
    this.formModel.next(form);
  }
}
