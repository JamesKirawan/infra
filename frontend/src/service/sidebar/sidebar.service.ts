import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public onEventChange: BehaviorSubject<any>;
  constructor() {
    this.onEventChange = new BehaviorSubject([]);
  }

  addData(data: string){
    this.onEventChange.next([data]);
  }
}
