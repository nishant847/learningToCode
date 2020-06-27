import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: 'employee/list',
    component: EmployeeListComponent,
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeComponent,
  },

  {
    path: 'user',
    children: [
      {
        path: 'list',
        component: UserListComponent,
        children: [
          {
            path: 'detail/:name',
            component: UserComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
