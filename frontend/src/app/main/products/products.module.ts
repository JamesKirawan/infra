import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxFileUploadUiCommonModule, NgxFileUploadUiProgressbarModule, NgxFileUploadUiToolbarModule } from "@ngx-file-upload/ui";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'app/shared/shared.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxMaskModule } from 'ngx-mask';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './pages/product-data/products.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'
const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgbModalModule,
    CardSnippetModule,
    NgxDatatableModule,
    NgxMaskModule,
    NgxFileUploadUiToolbarModule,
    NgxFileUploadUiProgressbarModule,
    NgxFileUploadUiCommonModule,
    NgxFileDropModule,
    SwiperModule,
    NgSelectModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class ProductsModule { }
