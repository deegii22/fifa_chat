import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, public snackBar: MatSnackBar) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.log(err.error.message);
      this.snackBar.open(err.error.message,'',{duration:2000});
      // console.error(err);
    }); 
  }
}
