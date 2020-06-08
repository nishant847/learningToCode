import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less'],
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
    });
  }
}
