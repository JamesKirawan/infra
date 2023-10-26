import { DatePipe, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EcommerceCheckoutItemComponent } from 'app/main/ecommerce/ecommerce-checkout/ecommerce-checkout-item/ecommerce-checkout-item.component';
import { EcommerceCheckoutComponent } from 'app/main/ecommerce/ecommerce-checkout/ecommerce-checkout.component';
import { EcommerceDetailsComponent } from 'app/main/ecommerce/ecommerce-details/ecommerce-details.component';
import { EcommerceItemComponent } from 'app/main/ecommerce/ecommerce-item/ecommerce-item.component';
import { EcommerceShopComponent } from 'app/main/ecommerce/ecommerce-shop/ecommerce-shop.component';
import { EcommerceSidebarComponent } from 'app/main/ecommerce/ecommerce-shop/sidebar/sidebar.component';
import { EcommerceWishlistComponent } from 'app/main/ecommerce/ecommerce-wishlist/ecommerce-wishlist.component';
import { SharedModule } from 'app/shared/shared.module';
import { NouisliderModule } from 'ng2-nouislider';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { CommentContentComponent } from './ecommerce-details/comment-content/comment-content.component';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true
};

// routing
const routes: Routes = [
  {
    path: 'shop',
    component: EcommerceShopComponent
  },
  {
    path: 'products/:id',
    component: EcommerceDetailsComponent
  },
  {
    path: 'wishlist',
    component: EcommerceWishlistComponent
  },
  {
    path: 'checkout',
    component: EcommerceCheckoutComponent
  }
  // {
  //   path: 'details/:id',
  //   component: EcommerceDetailsComponent,
  //   resolve: {
  //     product: ProductService
  //   },
  //   data: { animation: 'EcommerceDetailsComponent' }
  // },
  // {
  //   path: 'wishlist',
  //   component: EcommerceWishlistComponent,
  //   resolve: {
  //     product: ProductService
  //   },
  //   data: { animation: 'EcommerceWishlistComponent' }
  // },
  // {
  //   path: 'checkout',
  //   component: EcommerceCheckoutComponent,
  //   resolve: {
  //     product: ProductService
  //   },
  //   data: { animation: 'EcommerceCheckoutComponent' }
  // },
  // {
  //   path: 'details',
  //   redirectTo: '/details/27', //Redirection
  //   data: { animation: 'EcommerceDetailsComponent' }
  // }
];

@NgModule({
  declarations: [
    EcommerceShopComponent,
    EcommerceSidebarComponent,
    EcommerceDetailsComponent,
    EcommerceWishlistComponent,
    EcommerceCheckoutComponent,
    EcommerceItemComponent,
    EcommerceCheckoutItemComponent,
    CommentContentComponent,
    EcommerceSidebarComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SwiperModule,
    SharedModule,
    NgbRatingModule,
    NgxMaskModule,
    NouisliderModule,
    FormsModule,
    PerfectScrollbarModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    DatePipe,
    PercentPipe
  ]
})
export class EcommerceModule {}
