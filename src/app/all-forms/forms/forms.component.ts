import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewFormComponent} from '../new-form/new-form.component';
import {Router} from '@angular/router';
import { JsonStructure } from '../models/JsonStructure';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {


  constructor(private dialog: MatDialog, public router: Router) {
  }

  ngOnInit() {
  }

  openNewFormModal() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    this.dialog.open(NewFormComponent, dialogConfig).afterClosed().subscribe(res => {

    });
  }


}



