import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ComponentCommunicationService} from 'src/app/services/component-communication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  updateMessage = true;
  allForms = [];
  private json = {name: 'ok'};


  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NewFormComponent>,
              private communicationService: ComponentCommunicationService,
              private router: Router) {

  }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit(): void {

  }

  createForm() {
    const id = this.calculateId();
    this.formGroup = this.formBuilder.group({
      'id': [id, [Validators.required]],
      'name': [null, [Validators.required]],
      'description': [null, [Validators.required]],
    })
    this.communicationService.newForm.next(this.formGroup);


  }

  save() {
    console.log(this.formGroup);
    this.dialogRef.close();
    const json = this.json;
    history.pushState({data: {json}}, '', '');
    this.router.navigate(['createForm'], {state: {data: {json}}});
  }

  calculateId() {
    return this.allForms.length ? this.allForms.length + 1 : 0;

  }
}
