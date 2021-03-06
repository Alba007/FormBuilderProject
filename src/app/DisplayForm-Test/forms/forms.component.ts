import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewFormComponent} from '../new-form/new-form.component';
import {Router} from '@angular/router';
import {JsonStructure} from '../models/JsonStructure';
import {MatTableDataSource} from '@angular/material';
import {LocalStorageService} from 'src/app/Formbuilder/services/local-storage.service';
import {StateControlService} from '../../Formbuilder/services/state-control.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  public dataSource = new MatTableDataSource<JsonStructure>();
  displayedColumns = ['name', 'description', 'preview', 'update'];

  constructor(private stateFormService: StateControlService,
              private dialog: MatDialog,
              public router: Router,
              private localStorageService: LocalStorageService) {

  }


  ngOnInit() {
    this.dataSource.data = this.localStorageService.getAllFromLocalStorage();
  }

  openNewFormModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    this.dialog.open(NewFormComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }

  updateForm(form) {
    this.router.navigate(['createForm'], {queryParams: form});
  }

  preview(form) {
    this.router.navigate(['display'], {queryParams: form});
  }

}



