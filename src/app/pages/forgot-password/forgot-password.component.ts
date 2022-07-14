import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm : FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  constructor(private formBuilder: FormBuilder,
              public authService: AuthService
              ) { }

  ngOnInit(): void {
  }

  isFieldValid(field: string) {
    return !this.forgotPasswordForm.get(field)!.valid && this.forgotPasswordForm.get(field)!.touched;
  }

  public validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  public forgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      this.authService.ForgotPassword(this.forgotPasswordForm.value.email);
    } else {
      this.validateAllFormFields(this.forgotPasswordForm);
    }
  }
}
