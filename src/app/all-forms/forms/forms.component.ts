import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewFormComponent } from '../new-form/new-form.component';
import { JsonStructure } from 'src/app/all-forms/models/JsonStructure';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
myForm:JsonStructure={};


 
  constructor(private dialog: MatDialog) {
    
   }


  ngOnInit() {
  }

  openNewFormModal(){
   const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    this.dialog.open(NewFormComponent, dialogConfig).afterClosed().subscribe(res => {
      this.myForm.name=res.data.getRawValue().name;
      this.myForm.description=res.data.getRawValue().description;
      this.myForm.form = {};
      console.log(this.myForm)
// Routing here
 });
}




}



