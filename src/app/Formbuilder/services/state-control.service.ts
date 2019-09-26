import {Injectable} from '@angular/core';
import {of, Subject} from 'rxjs';
import {
  DynamicCheckboxGroupModel,
  DynamicCheckboxModel,
  DynamicFormArrayModel,
  DynamicFormControlModel,
  DynamicFormModel,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicSelectModel,
  DynamicSliderModel,
  DynamicTextAreaModel
} from '@ng-dynamic-forms/core';
import {Event} from '../event';
import {JsonStructure} from '../../all-forms/models/JsonStructure';

@Injectable({
  providedIn: 'root'
})
export class StateControlService {
  testttt: String;
  object: any;
  control: string;
  eventDispatcher = new Subject<Event>();
  dataModel = new Subject<DynamicFormModel>();
  formModel = new Subject<DynamicFormControlModel>();
  edit = new Subject<DynamicFormControlModel>();
  map = new Map();
  formControl: DynamicFormModel;
  toBeEdit = false;
  formData = new Subject<JsonStructure>();

  constructor() {
    this.map.set('INPUT', {
      id: 'text',
      label: 'text',
      maxLength: 'number',
      minLength: 'number',
      placeholder: 'text',
      required: 'Boolean',
      mask: []
    });
    this.map.set('EMAIL', {
      id: 'text',
      label: 'text',
      maxLength: 'number',
      placeholder: 'text',
      mask: []

    });
    this.map.set('PASSWORD', {
      id: 'text',
      label: 'text',
      maxLength: 'number',
      minLength: 'number',
      placeholder: 'text',
      required: 'Boolean',
      mask: []

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
      minLength: 'number',
      required: 'Boolean',
      mask: []

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
    this.formData.subscribe(data => {
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
    this.formControl = [];
    let pair;
    if (data.payload.type) {
      this.toBeEdit = true;
      pair = this.map.get(data.payload.type);
      this.control = data.payload.type;
    } else {
      this.toBeEdit = false;
      pair = this.map.get(data.payload);
      this.control = data.payload;
    }
    let valueOfControl;
    let req;
    for (const controlValues in pair) {
      controlValues === 'id' ? req = true : req = null;
      valueOfControl = data.payload[controlValues];
      if (pair[controlValues] === 'number' || pair[controlValues] === 'text') {
        this.createInputWithDifferentTypes(pair[controlValues], controlValues, req, valueOfControl);
      } else {
        if (pair[controlValues] === 'Boolean') {
          this.createCheckbox(controlValues);
        }
      }
      if (controlValues === 'options') {
        if (data.payload._options || data.payload.group) {
          this.createOptionsFull(data, controlValues);
        } else {
          this.createOptionsEmpty(controlValues);
        }
      } else {
        if (controlValues === 'mask') {
          this.createInputWithDifferentTypes('text', controlValues, req, valueOfControl);
        }
      }
    }
    this.dataModel.next(this.formControl);
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
        if (element.id === 'options') {
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
        }
      } else {
        if (element.id === 'mask') {
          const myObj = {
            mask: element._value
          };
          //let test = JSON.parse(myObj);
          // test.replace('mask','')
          // test.replace(':','')
          // test.replace('"','')
          // console.log(test);
          this.object[element.id] = [];
          this.object[element.id].push(new RegExp(element._value));
        } else {
          this.object[element.id] = element._value;
        }
      }
    });

    const form = this.createFormControlDynamiclly();
   // console.log(form);
    if (this.toBeEdit) {
      this.edit.next(form);

    } else {
      this.formModel.next(form);
    }

  }

  createOptionsFull(data: Event, controlValues) {
    let attr = '';
    if (data.payload.type === 'CHECKBOX_GROUP') {
      attr = 'group';
    } else {
      attr = '_options';
    }
    length = data.payload[attr].length;
    let i = -1;

    this.formControl.push(new DynamicFormArrayModel({
      id: controlValues,
      initialCount: length,
      groupFactory: () => {
        return [
          new DynamicInputModel({
            id: 'myInput',
            label: (i < length && i >= 0) ? data.payload[attr][i].label : '',
            value: (i < length && i >= 0) ? data.payload[attr][i++].label : i++
          })];
      }
    }));
  }

  createOptionsEmpty(controlValues) {
    this.formControl.push(new DynamicFormArrayModel({
      id: controlValues,
      initialCount: 3,
      groupFactory: () => {
        return [
          new DynamicInputModel({
            id: 'myInput',
            label: 'Item'
          })];
      }
    }));
  }

  createCheckbox(controlValues) {
    this.formControl.push(new DynamicCheckboxModel({
      id: controlValues,
      label: controlValues
    }));
  }

  createInputWithDifferentTypes(type, controlValues, req, value) {
    this.formControl.push(new DynamicInputModel({
      id: controlValues,
      label: controlValues,
      inputType: type,
      value,
      required: req,
    }));
  }

  createFormControlDynamiclly() {
    let form;
    let attr;
    switch (this.control) {
      case 'INPUT':
        form = new DynamicInputModel(
          this.object
        );
        return form;
      case 'EMAIL':
        attr = 'inputType';
        this.object[attr] = 'email';
        form = new DynamicInputModel(
          this.object
        );
        return form;
      case 'SELECT':
        form = new DynamicSelectModel<string>(
          this.object
        );
        return form;
      case 'PASSWORD':
        attr = 'inputType';
        this.object[attr] = 'password';
        form = new DynamicInputModel(
          this.object
        );
        return form;
      case 'CHECKBOX':
        form = new DynamicCheckboxModel(
          this.object);
        return form;
      case 'RADIO_GROUP':
        form = new DynamicRadioGroupModel<string>(
          this.object
        );
        return form;
      case 'CHECKBOX_GROUP':
        form = new DynamicCheckboxGroupModel(
          this.object
        );
        return form;
      case 'SLIDER':
        form = new DynamicSliderModel(
          this.object
        );
        return form;
      case 'TEXTAREA':
        form = new DynamicTextAreaModel(this.object);
        return form;
    }
  }
}
