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
  control: string;
  eventDispatcher = new Subject<Event>();
  dataModel = new Subject<DynamicFormModel>();
  formModel = new Subject<DynamicFormControlModel>();
  map = new Map();

  constructor(private formService: DynamicFormService) {
    this.map.set('INPUT', {
      id: 'Text',
      label: 'Text',
      maxLength: 'Number',
      placeholder: 'Text',
      required: 'Boolean'
    });
    this.map.set('EMAIL', {
      id: 'Text',
      label: 'Text',
      maxLength: 'Number',
      placeholder: 'Text',
      validators: {
        required: 'Boolean'
      }
    });
    this.map.set('PASSWORD', {
      id: 'Text',
      label: 'Text',
      minLength: 'Number',
      placeholder: 'Text',
      required: 'Boolean'
    });
    this.map.set('CHECKBOX', {
      id: 'Text',
      label: 'Text',
      required: 'Boolean'
    });
    this.map.set('RADIO_GROUP', {
      id: 'Text',
      label: 'Text',
      options:
        [{
          label: 'Text',
          value: 'Text'
        }],
      required: 'Boolean'
    });

    this.map.set('CHECKBOX_GROUP', {
      id: 'Text',
      label: 'Text',
      options:
        [{
          id: 'Text',
          label: 'Text'
        }],
      required: 'Boolean'
    });

    this.map.set('SLIDER', {
      id: 'Text',
      min: 'Number',
      max: 'Number',
      vertical: 'Boolean',
      required: 'Boolean'
    });

    this.map.set('TEXTAREA', {
      id: 'Text',
      label: 'Text',
      required: 'Boolean'
    });

    this.map.set('SELECT', {
      id: 'Text',
      label: 'Text',
      options:
        [{
          label: 'Text',
          value: 'Text'
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
    const pair = this.map.get(data.payload);
    let valueOfControl;
    this.control = data.payload;
    let req;
    for (const controlValues in pair) {
      controlValues === 'id' ? req = true : req = null;
      valueOfControl = data.payload[controlValues];
      if (pair[controlValues] === 'Number' || pair[controlValues] === 'Text') {
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
      if (controlValues === 'options') {
        formControl.push(new DynamicFormArrayModel({
          id: 'options',
          initialCount: 3,
          groupFactory: () => {
            return [
              new DynamicInputModel({
                id: 'myInput',
                label: 'My Input'
              })
            ];
          }
        }));
      } else {
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
    }
    this.dataModel.next(formControl);
  }

  onAddProperties(data) {
    let attr = '';
    const object = {id: ''};
    if (this.control === 'SELECT') {
      attr = 'options';
      object[attr] = of([]);
    }
    data.payload.forEach(element => {
      if (element.type === 'ARRAY') {
        switch (element.id) {
          case 'validators':
            attr = 'validators';
            object[attr] = {};
            element.groups.forEach(ell => {
              const id = ell.group[0].id;
              const a = object[attr];
              a[id] = ell.group[0].value;
            });
            break;
          case 'options':
            attr = 'options';
            object[attr] = [];
            attr = 'group';
            object[attr] = [];
            element.groups.forEach(arrayElement => {
              const optObject = {
                id: arrayElement.group[0]._value,
                label: arrayElement.group[0]._value
              };
              if (this.control === 'CHECKBOX_GROUP') {
                object[attr].push(new DynamicCheckboxModel(
                  optObject
                ));
              } else {
                attr = 'options';
                object[attr].push(optObject);
              }
            });
            break;
        }
      } else {
        object[element.id] = element._value;
      }
    });
    let form;
    switch (this.control) {
      case 'INPUT':
        form = new DynamicInputModel(
          object
        );
        break;
      case 'EMAIL':
        attr = 'email';
        object[attr] = 'email';
        form = new DynamicInputModel(
          object
        );
        break;
      case 'SELECT':
        form = new DynamicSelectModel<string>(
          object
        );
        break;
      case 'PASSWORD':
        attr = 'password';
        object[attr] = 'password';
        form = new DynamicInputModel(
          object
        );
        break;
      case 'CHECKBOX':
        form = new DynamicCheckboxModel(
          object);
        break;
      case 'RADIO_GROUP':
        form = new DynamicRadioGroupModel<string>(
          object
        );
        break;
      case 'CHECKBOX_GROUP':
        form = new DynamicCheckboxGroupModel(
          object
        );
        break;
      case 'SLIDER':
        form = new DynamicSliderModel(
          object
        );
        break;
      case 'TEXTAREA':
        form = new DynamicTextAreaModel(object);
        break;
    }
    this.formModel.next(form);
  }
}
