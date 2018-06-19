import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '../default.error-matcher';
import { HttpService } from '../http.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router, public snackBar: MatSnackBar, private httpService: HttpService) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email],
          this.emailValidator(this.httpService)
        ],
        password: ['', Validators.required],
        confirm_password: ['', [Validators.required]]
      }, 
      { 
        validator: this.passwordMatcher 
      }
    );
  }

  register() {
    if (this.myForm.valid) {
      const credentials: TokenPayload = {
        email: this.myForm.get('email').value,
        name: this.myForm.get('name').value,
        password: this.myForm.get('password').value
      };

      this.auth.register(credentials).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('/profile');
      }, (err) => {
        console.error(err);
      });
    }
  }

  emailValidator(httpService: HttpService) {
    return (control: AbstractControl) => {
      return httpService.isEmailRegistered(control.value).pipe(
        map(data => {
          if (data['isRegistered'] === true) {
            return { 'emailTaken': true };
          }
          return null;
        })
      )
    }
  }

  passwordMatcher(control: AbstractControl) {
    let password = control.get('password').value;
    let confirm_password = control.get('confirm_password').value;
    if (password !== confirm_password) {
      control.get('confirm_password').setErrors({ 'matchPassword': true });
    }
    return null;
  }
}
