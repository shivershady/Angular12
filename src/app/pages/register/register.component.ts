import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators , FormBuilder } from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  public date = new Date();
  public yearNow = this.date.getFullYear();
  public yearData: Array<number> = [];
  public dateOptions = {
    day: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    year: this.yearData
  }
  public registerForm : FormGroup = this.formBuilder.group({
    firstName: ['' , [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    dayOfBirth: [1],
    monthOfBirth: [1],
    yearOfBirth: [this.yearNow],
    gender: ['', [Validators.required]]
  });

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    for (let i = 1905; i <= this.yearNow; i++) {
      this.yearData.push(i);
    }
  }

  isFieldValid(field: string) {
    return !this.registerForm.get(field)!.valid && this.registerForm.get(field)!.touched;
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  public registerAccount(): void {
    if (this.registerForm.valid) {
      this.authService.SignUp(this.registerForm.value)
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }
}
