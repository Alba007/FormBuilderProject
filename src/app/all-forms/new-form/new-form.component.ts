import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ComponentCommunicationService} from 'src/app/services/component-communication.service';
import {Router} from '@angular/router';
import {JsonStructure} from '../models/JsonStructure';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  formGroup: FormGroup;
  updateMessage = true;
  allForms = [];
  private json = {name: 'ok'};
  myForm: JsonStructure = {};

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NewFormComponent>,
              private communicationService: ComponentCommunicationService,
              private router: Router) {

  }

  ngOnInit() {
   this.createForm()
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],

    });
    this.communicationService.newForm.next(this.formGroup)



}

  save() {
    console.log(this.formGroup);
    this.dialogRef.close();
    this.myForm.name = this.formGroup.getRawValue().name;
    this.myForm.description = this.formGroup.getRawValue().description;
    this.myForm.form = {};
    const json = this.myForm;
    history.pushState({data: {json}}, '', '');
    this.router.navigate(['createForm'], {state: {data: {json}}});
  }


}
