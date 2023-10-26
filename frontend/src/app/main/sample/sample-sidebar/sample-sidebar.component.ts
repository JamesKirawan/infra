import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { SidebarService } from 'service/sidebar/sidebar.service';

@Component({
  selector: 'app-sample-sidebar',
  templateUrl: './sample-sidebar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SampleSidebarComponent implements OnInit {
  DataForm: FormControl;
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private sidebarService: SidebarService
  ){

  }
  ngOnInit(){
    this.DataForm = new FormControl();
  }

  filter(){
    this.sidebarService.addData(this.DataForm.value);
    this._coreSidebarService.getSidebarRegistry('sample-sidebar').toggleOpen();
  }
}
