import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {JsonStructure} from '../../all-forms/models/JsonStructure';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  newform = new Subject<JsonStructure>();
  editForm = new Subject<any>();
  jsonStructure: JsonStructure[] = [];

  constructor() {


    this.newform.subscribe(dat => {
      localStorage.setItem(dat.name, JSON.stringify(dat));
    });
    this.editForm.subscribe(edit => {
      JSON.parse(localStorage.getItem(edit));
    });
  }


  getAllFromLocalStorage(): JsonStructure[] {
    this.jsonStructure = [];
    for (let i = 0; i < localStorage.length; i++) {
      this.jsonStructure[i] = JSON.parse(localStorage.getItem(localStorage.key(i))) ;
    }
    console.log(localStorage);
    return this.jsonStructure;
  }

  static deleteItem(key) {
    localStorage.removeItem(key);

  }
}
