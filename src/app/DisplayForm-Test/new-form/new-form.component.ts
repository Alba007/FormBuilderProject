import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {JsonStructure} from '../models/JsonStructure';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  formGroup: FormGroup;
  allForms = [];
  private json = {name: 'ok'};
  myForm: JsonStructure = {};

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NewFormComponent>,
              private router: Router) {

  }

  ngOnInit() {
   this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],

    });

}
  save() {
    this.dialogRef.close();
    this.myForm.form = '' ;
    const json = this.myForm;
    this.router.navigate(['createForm'], {queryParams: json});

  }


}
