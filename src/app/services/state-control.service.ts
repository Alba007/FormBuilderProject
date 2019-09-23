import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {
  DynamicCheckboxGroupModel,
  DynamicCheckboxModel,
  DynamicFormArrayModel,
  DynamicFormControlModel,
  DynamicFormModel,
  DynamicFormService,
  DynamicInputModel,
  DynamicRadioGroupModel,
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
    this.map.set('Input', {
      id: 'String',
      label: 'String',
      maxLength: 'Number',
      placeholder: 'String',
      required: 'Boolean'

    });
    this.map.set('Email', {
      id: 'String',
      label: 'String',
      maxLength: 'Number',
      placeholder: 'String',
      required: 'Boolean'

    });
    this.map.set('Checkbox', {
      id: 'String',
      label: 'String',
      required: 'Boolean'
    });

    this.map.set('Radiobutton', {
      id: 'String',
      label: 'String',
      options:
        [{
          label: 'String',
          value: 'String'
        }],
      required: 'Boolean'
    });

    this.map.set('CheckboxGroup', {
      id: 'String',
      label: 'String',
      options:
        [{
          id: 'String',
          label: 'String'
        }],
      required: 'Boolean'
    });

    this.map.set('slider', {
      id: 'String',
      min: 'Number',
      max: 'Number',
      vertical: 'Boolean',
      required: 'Boolean'
    });
    this.map.set('textarea', {
      id: 'String',
      label: 'String',
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
    const array = Array.from(this.map);
    array.map((value) => {
      const formControl: DynamicFormModel = [];
      if (value[0] === data.payload) {
        this.control = data.payload;
        const pair = value[1];
        let arr = Object.keys(pair).map((key) => [key, pair[key]]);
        arr.forEach(element => {
          switch (element[1]) {
            case 'String':
              formControl.push(new DynamicInputModel({
                id: element[0],
                label: element[0],
                inputType: 'text'
              }));
              break;
            case 'Number':
              formControl.push(new DynamicInputModel({
                id: element[0],
                label: element[0],
                inputType: 'number'

              }));
              break;
            case 'Boolean':
              formControl.push(new DynamicCheckboxModel({
                id: element[0],
                label: element[0]
              }));
              break;
          }
          if (element[0] === 'options') {
            formControl.push(new DynamicFormArrayModel({
              id: 'options',
              initialCount: 5,
              groupFactory: () => {
                return [
                  new DynamicInputModel({
                    id: 'myInput',
                    label: 'My Input'
                  })
                ];
              }
            }));
          }
          if (element[0] === 'validators') {
            arr = Object.keys(element[1]).map((key) => [key, element[1][key]]);
            formControl.push(new DynamicFormArrayModel({
              id: 'validators',
              initialCount: arr.length,
              groupFactory: () => {
                return [
                  new DynamicCheckboxModel({
                    id: '',
                    label: ''
                  })];
              }
            }));
            const formArray = this.formService.findById('validators', formControl) as DynamicFormArrayModel;
            let i = 0;
            formArray.groups.forEach(eachEl => {
              const el = arr[i];
              eachEl.group[0].id = el[0];
              eachEl.group[0].label = el[0];
              i++;
            });
          }
        });
        this.dataModel.next(formControl);
      }
    });
  }

  onAddProperties(data) {
    const object = {id: ''};
    this.map.get(this.control);
    const arr = Object.keys(this.map.get(this.control)).map((key) => [key, this.map.get(this.control)[key]]);
    let attribute;
    arr.forEach(element => {
      if (element[0] === 'options') {
        if (this.control === 'CheckboxGroup') {
          attribute = 'group';
          object[attribute] = [];
        } else {
          attribute = 'options';
          object[attribute] = [];
        }

      } else {
        if (element[0] === 'validators') {
          object[element[0]] = this.map.get(this.control).validators;
        } else {
          object[element[0]] = '';
        }
      }
    });
    const properties = data.payload;
    properties.forEach(element => {
      // console.log(element, 'ajo qe vjen nga properties')
      if (element.type === 'ARRAY') {
        switch (element.id) {
          case 'validators':
            element.groups.forEach(ell => {
              const test = ell.group[0].id;
              attribute = 'validators';
              const a = object[attribute];
              a[test] = ell.group[0].value;

            });
            break;
          case 'options':
            // let attribute;
            element.groups.forEach(arrayElement => {
              const optObject = {
                id: arrayElement.group[0]._value,
                label: arrayElement.group[0]._value
              };
              if (this.control === 'CheckboxGroup') {
                attribute = 'group';
                object[attribute].push(new DynamicCheckboxModel(
                  optObject
                ));
              } else {
                attribute = 'options';
                object[attribute].push(optObject);
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

      case 'Input':
        form = new DynamicInputModel(
          object
        );
        break;
      case 'Email':
        attribute = 'inputType';
        object[attribute] = 'email';
        form = new DynamicInputModel(
          object
        );
        break;
      case 'Checkbox':
        form = new DynamicCheckboxModel(
          object);
        break;
      case 'Radiobutton':
        form = new DynamicRadioGroupModel<string>(
          object
        );
        break;
      case 'CheckboxGroup':
        form = new DynamicCheckboxGroupModel(
          object
        );
        break;
      case 'slider':
        form = new DynamicSliderModel(
          object
        );
        break;
      case 'textarea':
        form = new DynamicTextAreaModel(object);
        break;
    }
    this.formModel.next(form);

  }
}
