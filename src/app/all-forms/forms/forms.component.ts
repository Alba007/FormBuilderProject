import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewFormComponent} from '../new-form/new-form.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  private alljsons: any;

  constructor(private dialog: MatDialog, public router: Router) {
  }

  ngOnInit() {

    this.alljsons = localStorage.getItem('name');
  }

  openNewFormModal() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    this.dialog.open(NewFormComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }


}



