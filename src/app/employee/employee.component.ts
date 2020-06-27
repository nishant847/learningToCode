import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { CustomValidators } from '../shared/CustomValidators';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './services/employee-service';
import { IEmployee } from './interfaces/IEmployee';
import { ISkills } from './interfaces/ISkill';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less'],
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employee: IEmployee;

  validationMessages = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be greater than 2 characters',
      maxlength: 'Name must be less than 6 characters',
    },

    email: {
      required: 'Email is required',
      emailDomain: 'Domain value must be dell.com',
    },
    confirmEmail: {
      required: 'Confirm Email is required',
      //emailDomain: 'Domain value must be dell.com',
    },
    emailGroup: {
      emailMismatch: 'Email & Confirmation Email do not match',
    },
    phone: {
      required: 'Phone is required',
    },
  };

  formsError = {
    name: '',
    email: '',
    confirmEmail: '',
    emailGroup: '',
    phone: '',
    skillName: '',
    experienceInYears: '',
    proficiency: '',
  };

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.employeeForm = new FormGroup({
    //   name: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl(),
    //   }),
    // });

    this.employeeForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
      ],
      contactPreference: ['email'],
      emailGroup: this.fb.group(
        {
          email: [
            '',
            [Validators.required, CustomValidators.emailDomain('dell.com')],
          ],
          confirmEmail: ['', Validators.required],
        },
        { validator: CustomValidators.matchEmail }
      ),
      phone: [''],
      skills: this.fb.array([this.addSkillFormGroup()]),
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm
      .get('contactPreference')
      .valueChanges.subscribe((data: string) => {
        this.onContactPreferenceChanged(data);
      });

    this.activatedRoute.paramMap.subscribe((params) => {
      const empId: number = +params.get('id');
      if (empId) {
        this.getEmployee(empId);
      } else {
        this.employee = {
          id: null,
          contactPreference: '',
          email: '',
          name: '',
          skills: [],
          phone: null,
        };
      }
    });
  }

  getEmployee = (empId: number) => {
    this.employeeService.getEmployee(empId).subscribe(
      (employee: IEmployee) => {
        this.editEmployee(employee);
        this.employee = employee;
      },
      (err) => {
        console.log(err);
      }
    );
  };

  editEmployee = (employee: IEmployee) => {
    this.employeeForm.patchValue({
      name: employee.name,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email,
      },
      phone: employee.phone,
    });

    this.employeeForm.setControl(
      'skills',
      this.setExistingSkills(employee.skills)
    );
  };

  setExistingSkills = (skillSets: ISkills[]): FormArray => {
    const formArray = new FormArray([]);

    skillSets.forEach((s) => {
      formArray.push(
        this.fb.group({
          skillName: s.skillName,
          experienceInYears: s.experienceInYears,
          proficiency: s.proficiency,
        })
      );
    });
    return formArray;
  };

  addSkillFormGroup = (): FormGroup => {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required],
    });
  };

  addSkillButtonClick = (): void => {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  };

  onContactPreferenceChanged = (selectedValue: string) => {
    const phoneControl = this.employeeForm.get('phone');

    switch (selectedValue) {
      case 'email':
        phoneControl.clearValidators();
        break;
      case 'phone':
        phoneControl.setValidators(Validators.required);
        break;
    }

    phoneControl.updateValueAndValidity();
  };

  onSubmit = () => {
    // console.log(this.employeeForm.controls.name.value);
    // console.log(this.employeeForm.get('name').value);
    this.mapFormValuesToEmployeeModel();
    if (this.employee.id) {
      this.employeeService.update(this.employee).subscribe(() => {
        this.router.navigate(['employee/list']), (err: any) => console.log(err);
      });
    } else {
      this.employeeService.create(this.employee).subscribe(() => {
        this.router.navigate(['employee/list']), (err: any) => console.log(err);
      });
    }
  };

  mapFormValuesToEmployeeModel = () => {
    this.employee.name = this.employeeForm.value.name;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  };

  logValidationErrors = (group: FormGroup = this.employeeForm) => {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      //abstractControl.markAsDirty();
      this.formsError[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched ||
          abstractControl.dirty ||
          abstractControl.value !== '')
      ) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          this.formsError[key] += messages[errorKey] + ' ';
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
    });
  };

  onLoadDataClick = (): void => {
    // this.employeeForm.patchValue({
    //   name: 'Ruu',
    //   email: 'ru@tieto.com',
    //   // skills: {
    //   //   skillName: 'HTML',
    //   //   experienceInYears: 1,
    //   //   proficiency: 'beginner',
    //   // },
    // });
    //this.logValidationErrors();
    //console.log(this.formsError);

    const formArray = new FormArray([
      new FormControl('Jhon', [Validators.required]),
      new FormGroup({
        country: new FormControl('', [Validators.required]),
      }),
      new FormArray([]),
    ]);

    const formArray1 = this.fb.array([
      new FormControl('Jhon', [Validators.required]),
      new FormControl('IT', [Validators.required]),
      new FormControl('sd', [Validators.required]),
    ]);

    console.log(formArray1.valid);
  };

  get name() {
    return this.employeeForm.get('name');
  }
}
