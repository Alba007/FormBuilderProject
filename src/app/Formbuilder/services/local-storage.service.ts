import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NewForm } from '../../event';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  newform = new Subject<NewForm>();
  editForm = new Subject<any>();

  constructor() {
    this.newform.subscribe(dat => {
      localStorage.setItem(dat.id, JSON.stringify(dat));
      //do hapet app components
    })
    this.editForm.subscribe(edit=> {
      JSON.parse(localStorage.getItem(edit));
      //do hapet app components
    })
  }
}
