import {Component, OnInit} from '@angular/core';
import { FormGroup,  FormControl } from '@angular/forms';

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

  public registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    dayOfBirth: new FormControl(1),
    monthOfBirth: new FormControl(1),
    yearOfBirth: new FormControl(1905),
    gender: new FormControl('')
  });
  constructor() {
  }

  ngOnInit(): void {
    for (let i = 1905; i <= this.yearNow; i++) {
      this.yearData.push(i);
    }
  }

  public registerAccount(): void {
    console.log(this.registerForm.value);
  }

}
