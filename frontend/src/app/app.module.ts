import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreModule } from '@core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { coreConfig } from 'app/app-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import 'hammerjs';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast
import { AuthGuard, ErrorInterceptor, JwtInterceptor } from './core';
import { UserService } from './main/user/service/user.service';
import { EcommerceModule } from './main/ecommerce/ecommerce.module';
import { EcommerceService } from './main/ecommerce/service/ecommerce.service';
import { ProductService } from './main/products/service/product.service';

export function getToken() {
  return localStorage.getItem('accessToken')
}

const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./main/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'products',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./main/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: '',
    redirectTo: '/shop',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    CardSnippetModule,

    // App modules
    LayoutModule,
    EcommerceModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    JwtHelperService,
    EcommerceService,
    UserService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
