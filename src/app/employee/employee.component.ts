import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CustomValidators } from '../shared/CustomValidators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less'],
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;

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
    skillName: {
      required: 'Skill is required',
    },
    experienceInYears: {
      required: 'Experience  is required',
    },
    proficiency: {
      required: 'Proficiency  is required',
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

  constructor(private fb: FormBuilder) {}

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
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required],
      }),
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm
      .get('contactPreference')
      .valueChanges.subscribe((data: string) => {
        this.onContactPreferenceChanged(data);
      });
  }

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
    console.log(this.employeeForm.controls.name.value);
    console.log(this.employeeForm.get('name').value);
  };

  logValidationErrors = (group: FormGroup = this.employeeForm) => {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      //abstractControl.markAsDirty();
      this.formsError[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          this.formsError[key] += messages[errorKey] + ' ';
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
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
    this.logValidationErrors();
    //console.log(this.formsError);
  };

  get name() {
    return this.employeeForm.get('name');
  }
}
