import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AuthLoginV2Component } from 'app/main/authentication/pages/auth-login-v2/auth-login-v2.component';
import { AuthRegisterV2Component } from './pages/auth-register-v2/auth-register-v2.component';
const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginV2Component
  },
  {
    path: 'register',
    component: AuthRegisterV2Component
  }
];

@NgModule({
  declarations: [AuthLoginV2Component,AuthRegisterV2Component],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CoreCommonModule,
    ContentHeaderModule
  ]
})
export class AuthenticationModule {}
