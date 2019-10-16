import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynamicFormArrayModel, DynamicFormModel, DynamicFormService, MATCH_DISABLED, MATCH_HIDDEN} from '@ng-dynamic-forms/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements AfterViewInit, OnInit {
  hasOptions = true;
  related = false;
  formGroup: FormGroup;
  relations: FormGroup;
  formModel: DynamicFormModel = [];
  showForm = false;
  formArrayControl: FormArray;
  formArrayModel;
  listId = [];
  idClicked = '';

  constructor(private formService: DynamicFormService,
              private router: Router,
              private stateControlService: StateControlService,
              private cd: ChangeDetectorRef) {
    this.formModel = [];
    this.relations = new FormGroup({
      relatedOption: new FormControl('', Validators.required),
      relatedId: new FormControl('', Validators.required),
      relatedValue: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.listId = [];
    this.stateControlService.idList.subscribe(list => {
      this.listId = list;
    });
    this.stateControlService.updateContent.subscribe(res => {
      this.formModel = [];
      this.related = false;
      this.setOptions('', '', '');
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.stateControlService.dataModel.subscribe(data => {
      const id = data[0][0] as any;
      if (id._value === null) {
        this.idClicked = '';
      } else {
        this.idClicked = id._value;
      }
      this.formGroup = this.formService.createFormGroup(data[0]);
      this.formModel = data[0];
      this.formArrayControl = this.formGroup.get('options') as FormArray;
      this.formArrayModel = this.formService.findById('options', this.formModel);
      this.showForm = true;
      this.hasOptions = this.formArrayControl != null;
      this.setRelations(data);
    });
  }

  removeItem(context: DynamicFormArrayModel, index: number) {
    this.formService.removeFormArrayGroup(index, this.formArrayControl, context);
  }

  insertItem(context: DynamicFormArrayModel, index: number) {
    this.formService.insertFormArrayGroup(index, this.formArrayControl, context);
  }

  save(newModel) {
    if (this.related) {
      if (this.relations.invalid) {
        return;
      }
    }
    const exist = this.listId.indexOf(this.idClicked);
    if (exist >= 0) {
      this.listId[exist] = newModel[0]._value;
    } else {
      this.listId.push(newModel[0]._value);
    }
    this.stateControlService.idList.next(this.listId);
    let relats;
    if (this.related) {
      relats = {
        match: this.relations.getRawValue().relatedOption,
        relationId: this.relations.getRawValue().relatedId,
        relationValue: this.relations.getRawValue().relatedValue
      };
    } else {
      relats = '';
    }
    if (this.formGroup.valid) {
      const event = {
        type: 'addProperties',
        payload: newModel,
        relations: relats
      };
      this.stateControlService.eventDispatcher.next(event);
      this.formModel = [];
      this.related = false;
      this.showForm = false;
      this.setOptions('', '', '');
    }
  }

  setOptions(match, id, value) {
    this.relations.setValue({
      relatedOption: match,
      relatedId: id,
      relatedValue: value
    });
  }

  setRelations(data) {
    if (data[1] !== '') {
      this.related = true;
      let match1;
      if (data[1].length !== 0) {
        switch (data[1][0].match) {
          case 'DISABLED':
            match1 = 'MATCH_DISABLED';
            break;
          case 'HIDDEN':
            match1 = 'MATCH_HIDDEN';
            break;
          case 'REQUIRED':
            match1 = 'MATCH_REQUIRED';
        }
        this.setOptions(match1, data[1][0].when[0].id, data[1][0].when[0].value);
      } else {
        this.related = false;
        this.setOptions('', '', '');
      }
    } else {
      this.related = false;
      this.setOptions('', '', '');
    }
  }
}
