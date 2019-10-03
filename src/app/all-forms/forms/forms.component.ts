import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewFormComponent} from '../new-form/new-form.component';
import {Router} from '@angular/router';
import {JsonStructure} from '../models/JsonStructure';
import {MatTableDataSource} from '@angular/material';
import {LocalStorageService} from 'src/app/Formbuilder/services/local-storage.service';
import {StateControlService} from '../../Formbuilder/services/state-control.service';
import {ConfirmationMessageComponent} from '../../Formbuilder/confirmation-message/confirmation-message.component';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {ng
  public dataSource = new MatTableDataSource<JsonStructure>();
  displayedColumns = ['name', 'description', 'update', 'delete'];

  constructor(private stateFormService: StateControlService,
              private dialog: MatDialog,
              public router: Router,
              private localStorageService: LocalStorageService) {
    this.dataSource.data = this.localStorageService.getAllFromLocalStorage();
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

  updateForm(form) {
    this.router.navigate(['createForm'], {queryParams: form});
  }


  deleteForm(name) {
    this.dialog.open(ConfirmationMessageComponent, {
      width : '390px',
      panelClass: 'confirm-dialog-container',
      data: {
        message: 'Do you want do delete '
      }

    }).afterClosed().subscribe(res => {
      if (res) {
        LocalStorageService.deleteItem(name);
        this.dataSource.data = [];
        this.dataSource.data = this.localStorageService.getAllFromLocalStorage();
      }

    });
  }
}



