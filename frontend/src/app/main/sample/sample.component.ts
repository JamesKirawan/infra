import { Component, OnInit } from '@angular/core'

import { locale as en } from './i18n/en'
import { locale as fr } from './i18n/fr'
import { locale as de } from './i18n/de'
import { locale as pt } from './i18n/pt'

import { CoreTranslationService } from '@core/services/translation.service'
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service'
import { SidebarService } from 'service/sidebar/sidebar.service'

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  public contentHeader: object
  sidebarData = ['Test1'];
  /**
   *
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(
    private _coreTranslationService: CoreTranslationService,
    private _coreSidebarService: CoreSidebarService,
    private sidebarService: SidebarService
  ) {
    this._coreTranslationService.translate(en, fr, de, pt)
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.sidebarService.onEventChange.subscribe((res: any) => {
      this.sidebarData = res
    })
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
  }

  toggleSidebar(){
    this._coreSidebarService.getSidebarRegistry('sample-sidebar').toggleOpen()
  }
}
