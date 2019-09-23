import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {
  updateMessage= new Subject<boolean>();
  newForm= new Subject<FormGroup>();
  constructor() { }
}
