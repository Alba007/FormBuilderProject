import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NewForm} from '../event';
import {JsonStructure} from '../../all-forms/models/JsonStructure';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  newform = new Subject<JsonStructure>();
  editForm = new Subject<any>();

  constructor() {
    this.newform.subscribe(dat => {
      console.log(dat);
      localStorage.setItem(dat.name, JSON.stringify(dat));
    });
    this.editForm.subscribe(edit => {
      JSON.parse(localStorage.getItem(edit));
    });
  }
}
