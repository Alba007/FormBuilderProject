import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JsonStructure} from '../../all-forms/models/JsonStructure';
import {LocalStorageService} from '../services/local-storage.service';
import {MatDialog} from '@angular/material';
import {ConfirmationMessageComponent} from '../confirmation-message/confirmation-message.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterViewInit {
  showForm = false;
  formGroup: FormGroup;
  formModel: DynamicFormModel = [];
  pocChange: number;
  formData: JsonStructure;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formService: DynamicFormService,
              private stateControlService: StateControlService,
              private cd: ChangeDetectorRef,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog) {
    this.route.queryParams.subscribe(existData => {
      this.formData = existData;
      this.formModel = [];
      if (existData.form !== '') {
        this.formModel = this.formService.fromJSON(existData.form);
        this.showForm = true;
      }
      this.formGroup = this.formService.createFormGroup(this.formModel);

    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.stateControlService.formModel.subscribe(data => {
      this.formModel.push(data);
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.showForm = true;
    });
    this.stateControlService.edit.subscribe(edit => {
      this.formModel[this.pocChange] = edit;
      this.formGroup = this.formService.createFormGroup(this.formModel);

    });
  }

  controlDetails(controlModel) {
    console.log(controlModel);
    const event = {
      type: 'addFormControl',
      payload: controlModel
    };
    this.pocChange = this.formModel.indexOf(controlModel);
    this.stateControlService.eventDispatcher.next(event);
  }

  save(formModel) {
    this.localStorageService.newform.next({
      name: this.formData.name,
      description: this.formData.description,
      form: JSON.stringify(formModel)
    });
    this.formModel = [];
    this.router.navigate(['allForms']);
  }

  delete(controlModel) {
    this.dialog.open(ConfirmationMessageComponent, {
      width: '350px',
      disableClose: true,
      data: {
        message: 'Are you sure you want to delete?'
      }
    }).afterClosed().subscribe(res => {
        if (res) {
          const posToDelete = this.formModel.indexOf(controlModel);
          this.formModel.splice(posToDelete);
          // delete content in properties component after delete
          if (this.pocChange === posToDelete) {
            this.stateControlService.updateContent.next(true);
          }
        }
      }
    );
  }
}
