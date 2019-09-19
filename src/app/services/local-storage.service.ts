import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements OnInit {
  dataToBeSaved = new Subject<any>();
  formData = new Subject<any>();
  constructor() { }
  ngOnInit() {
    this.dataToBeSaved.subscribe(dat => {
      localStorage.setItem('form', dat)
    })
  }
}
