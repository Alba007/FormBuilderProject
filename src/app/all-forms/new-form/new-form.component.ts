import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ComponentCommunicationService } from 'src/app/services/component-communication.service';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  formGroup: FormGroup;
  updateMessage = true;
  allForms = []
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<NewFormComponent>,private communicationService:ComponentCommunicationService) { 

  }

  ngOnInit() {
   this.createForm()
  }

  createForm(){
    //const id=this.calculateId();
    this.formGroup = this.formBuilder.group({
      //'id': [id, [Validators.required]],
      'name': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      
    })
    this.communicationService.newForm.next(this.formGroup)

  
  
}

save(){
  console.log(this.formGroup)
  this.dialogRef.close()
}

calculateId(){
  return this.allForms.length?this.allForms.length+1:0;

}
}
