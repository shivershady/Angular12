import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm : FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public authService: AuthService
  ) {}

  ngOnInit(): void {}

  isFieldValid(field: string) {
    return !this.loginForm.get(field)!.valid && this.loginForm.get(field)!.touched;
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

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password);
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  public loginGoogle(): void {
    this.authService.GoogleAuth();
  }

  public openRegister(): void {
    this.router.navigate(['register'], );
  }
}
