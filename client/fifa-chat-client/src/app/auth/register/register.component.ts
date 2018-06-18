import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators, ValidationErrors, AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  confirm_password: string = '';
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router, public snackBar: MatSnackBar, public http: HttpClient) { }

  ngOnInit(){
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        this.emailValidator.bind(this)
      ],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.credentials.password) {
      if (this.credentials.password !== this.confirm_password) {
        this.snackBar.open('Passwords are not match', '', { duration: 2000 });
        return;
      }
    }

    this.auth.register(this.credentials).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  emailValidator(control: AbstractControl){
    const isRegistered = this.http.get(`http://localhost:3000/auth/isRegistered?email=${control.value}`);
    return isRegistered.subscribe(
      (data) => {
        if (data['isRegistered'] === true) {
          this.snackBar.open('This email is already registered', '', { duration: 2000 });
          return {'registered':true};
        } else {
          return null;
        }
      }
    )
  }
}
