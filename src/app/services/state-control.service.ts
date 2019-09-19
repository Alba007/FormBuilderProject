import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { DynamicFormModel, DynamicFormControlModel, DynamicInputModel, DynamicCheckboxModel, DynamicFormArrayModel, DynamicTextAreaModel, DynamicSliderModel, DynamicCheckboxGroupModel, DynamicRadioGroupModel, DynamicFormService, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { Event } from '../event'
@Injectable({
  providedIn: 'root'
})
export class StateControlService {

  control: string;
  eventDispatcher = new Subject<Event>();
  dataModel = new Subject<DynamicFormModel>();
  formModel = new Subject<DynamicFormControlModel>();
  map = new Map;
  constructor(private formService: DynamicFormService) {
    this.map.set("Input", {
      id: 'String',
      label: 'String',
      maxLength: 'Number',
      placeholder: 'String',
      required: 'Boolean'

    });
    this.map.set("Email", {
      id: 'String',
      label: 'String',
      maxLength: 'Number',
      placeholder: 'String',
      required: 'Boolean'

    });
    this.map.set("Password", {
      id: 'String',
      label: 'String',
      minLength: 'Number',
      placeholder: 'String',
      required: 'Boolean'

    });
    this.map.set("Checkbox", {
      id: 'String',
      label: 'String',
      required: 'Boolean'
    });

    this.map.set("Radiobutton", {
      id: 'String',
      label: 'String',
      options:
        [{
          label: 'String',
          value: 'String'
        }],
      required: 'Boolean'
    });

    this.map.set("CheckboxGroup", {
      id: 'String',
      label: 'String',
      options:
        [{
          id: 'String',
          label: 'String'
        }],
      required: 'Boolean'
    })

    this.map.set("slider", {
      id: 'String',
      min: 'Number',
      max: 'Number',
      vertical: 'Boolean',
      required: 'Boolean'
    })

    this.map.set("textarea", {
      id: 'String',
      label: 'String',
      required: 'Boolean'
    })

    this.map.set("Select", {
      id: 'String',
      label: 'String',
      options:
        [{
          label: 'String',
          value: 'String'
        }],
      required: 'Boolean'
    });

    this.eventDispatcher.subscribe((data: Event) => this.createProperties(data))
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
    let array = Array.from(this.map)
    array.map((value) => {
      let formGroup: FormGroup;
      let formControl: DynamicFormModel = [];
      //console.log(Array.from(value[1]))
      if (value[0] == data.payload) {
        this.control = data.payload
        // console.log(value)
        let pair = value[1]
        const arr = Object.keys(pair).map((key) => [key, pair[key]]);
        //   console.log(arr)
        //per secilen property te nje form control do krijohet nje form control me vete
        arr.forEach(element => {
          // console.log(element)
          switch (element[1]) {
            case 'String':
              formControl.push(new DynamicInputModel({
                id: element[0],
                label: element[0],
                inputType: "text"
              }))
              break;
            case 'Number':
              formControl.push(new DynamicInputModel({
                id: element[0],
                label: element[0],
                inputType: "number"

              }))
              break;
            case 'Boolean':
              formControl.push(new DynamicCheckboxModel({
                id: element[0],
                label: element[0]
              }))
              break;
          }
          if (element[0] === 'options') {
            formControl.push(new DynamicFormArrayModel({
              id: "options",
              initialCount: 5,
              groupFactory: () => {
                return [
                  new DynamicInputModel({
                    id: "myInput",
                    label: "My Input"
                  })
                ];
              }
            }))
          }
          if (element[0] == 'validators') {
            const arr = Object.keys(element[1]).map((key) => [key, element[1][key]]);
            formControl.push(new DynamicFormArrayModel({
              id: "validators",
              initialCount: arr.length,
              groupFactory: () => {
                return [
                  new DynamicCheckboxModel({
                    id: '',
                    label: ''
                  })];
              }
            }))
            let formArray = this.formService.findById('validators', formControl) as DynamicFormArrayModel;
            let i = 0;
            formArray.groups.forEach(eachEl => {
              let el = arr[i]
              eachEl.group[0].id = el[0];
              eachEl.group[0].label = el[0];
              i++;
            })
          }
        })
        this.dataModel.next(formControl);
      }
    })
  }

  onAddProperties(data) {
    let object = { id: '' };
    this.map.get(this.control);
    const arr = Object.keys(this.map.get(this.control)).map((key) => [key, this.map.get(this.control)[key]]);
    arr.forEach(element => {
      if (element[0] === 'options') {
        if (this.control == 'CheckboxGroup') {
          object['group'] = []
        }
        else {
          if (this.control == 'Select') {
            object['options'] = of([]);
          }

          object['options'] = [];
        }

      }
      else {
        if (element[0] === 'validators') {
          object[element[0]] = this.map.get(this.control).validators;
        }
        else { object[element[0]] = "" }
      }
    })
    //console.log(object)
    let properties = data.payload
    properties.forEach(element => {
      // console.log(element, 'ajo qe vjen nga properties')
      if (element.type === 'ARRAY') {
        switch (element.id) {
          case 'validators':
            element.groups.forEach(ell => {
              let test = ell.group[0].id;
              let a = object['validators']
              a[test] = ell.group[0].value

            })
            break;
          case 'options':
            element.groups.forEach(arrayElement => {
              let optObject = {
                id: arrayElement.group[0]._value,
                label: arrayElement.group[0]._value
              }
              if (this.control == 'CheckboxGroup') {

                object['group'].push(new DynamicCheckboxModel(
                  optObject
                ));
              }
              else {

                object['options'].push(optObject);
              }

            });
            break;

        }
      }
      else {
        object[element.id] = element._value
      }

    });
    let form;
    switch (this.control) {
      case 'Input':
        form = new DynamicInputModel(
          object
        )
        break;
      case 'Email':
        object['inputType'] = 'email'
        form = new DynamicInputModel(
          object
        )
        break
      case 'Select':
        form = new DynamicSelectModel<String>(
          object
        )
        break
      case 'Password':
        object['inputType'] = 'password'
        form = new DynamicInputModel(
          object
        )
        break
      case 'Checkbox':
        form = new DynamicCheckboxModel(
          object)
        break
      case 'Radiobutton':
        form = new DynamicRadioGroupModel<string>(
          object
        )
        break
      case 'CheckboxGroup':
        form = new DynamicCheckboxGroupModel(
          object
        )
        break
      case 'slider':
        form = new DynamicSliderModel(
          object
        )
        break
      case 'textarea':
        form = new DynamicTextAreaModel(object)
        break
    }
    this.formModel.next(form)
    //ruhet json per kete forme

  }
}
