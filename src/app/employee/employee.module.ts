import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';

import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeEditComponent } from './employee-edit.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
  ],
})
export class EmployeeModule {}
