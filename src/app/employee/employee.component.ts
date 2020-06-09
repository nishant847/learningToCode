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
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl(),
      }),
    });
  }

  onSubmit = () => {
    console.log(this.employeeForm.controls.name.value);
    console.log(this.employeeForm.get('name').value);
  };

  onLoadDataClick = (): void => {
    this.employeeForm.patchValue({
      name: 'Ruu',
      email: 'ru@tieto.com',
      // skills: {
      //   skillName: 'HTML',
      //   experienceInYears: 1,
      //   proficiency: 'beginner',
      // },
    });
  };
}
