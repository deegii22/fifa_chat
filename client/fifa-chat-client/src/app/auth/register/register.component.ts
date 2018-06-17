import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

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

  constructor(private auth: AuthenticationService, private router: Router, public snackBar: MatSnackBar, public http: HttpClient) { }

  register() {
    if (this.credentials.password) {
      if (this.credentials.password !== this.confirm_password) {
        this.snackBar.open('Passwords are not match', '', { duration: 2000 });
        return;
      }
    }

    const isRegistered = this.http.get(`http://localhost:3000/auth/isRegistered?email=${this.credentials.email}`);
    isRegistered.subscribe(
      (data) => {
        if (data['isRegistered'] === true) {
          this.snackBar.open('This email is already registered', '', { duration: 2000 });
        } else {
          this.auth.register(this.credentials).subscribe((data) => {
            console.log(data);
            this.router.navigateByUrl('/profile');
          }, (err) => {
            console.error(err);
          });
        }
      },
      (err) => console.log(err)
    )
  }
}
