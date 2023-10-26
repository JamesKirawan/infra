import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserEditComponent } from 'app/main/user/pages/user-edit/user-edit.component';
import { UserListComponent } from 'app/main/user/pages/user-list/user-list.component';
import { UserListService } from 'app/main/user/pages/user-list/user-list.service';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

// routing
const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    data: { animation: 'UserListComponent' }
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    data: { animation: 'UserEditComponent' }
  }
];

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
  ]
})
export class UserModule {}
