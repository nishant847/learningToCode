import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { NamesComponent } from './names/names.component';
import { NameTagComponent } from './name-tag/name-tag.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';

import { UserService } from './service/user.service';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeService } from './employee/services/employee-service';
import { EmployeeEditComponent } from './employee/employee-edit.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    NamesComponent,
    NameTagComponent,
    EmployeeComponent,
    HomeComponent,
    AboutComponent,
    UserComponent,
    UserListComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    UserService,
    EmployeeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
