import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  returnUrl: string;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private router: Router, public snackBar: MatSnackBar) {}

  ngOnInit(){
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    }, (err) => {
      console.log(err.error.message);
      this.snackBar.open(err.error.message,'',{duration:2000});
      // console.error(err);
    }); 
  }
}
