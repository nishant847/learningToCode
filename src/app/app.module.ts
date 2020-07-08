import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { NamesComponent } from './names/names.component';
import { NameTagComponent } from './name-tag/name-tag.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor.module';
import { UserService } from './service/user.service';
import { EmployeeService } from './employee/services/employee-service';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    NamesComponent,
    NameTagComponent,
    NamesComponent,
    AboutComponent,
    UserComponent,
    UserListComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
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
