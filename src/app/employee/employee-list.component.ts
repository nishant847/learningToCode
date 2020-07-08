import { Component, OnInit } from '@angular/core';
import { IEmployee } from './interfaces/IEmployee';
import { EmployeeService } from './services/employee-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less'],
})
export class EmployeeListComponent implements OnInit {
  employees: IEmployee[];
  constructor(
    private _employeeService: EmployeeService,
    private _routerService: Router
  ) {}

  ngOnInit(): void {
    this._employeeService.get().subscribe(
      (listEmployees) => {
        this.employees = listEmployees;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editButtonClick = (id: number) => {
    this._routerService.navigate(['employees/edit', id]);
  };
}
