import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formSignIn: FormGroup;
  errors;
  objectKeys = Object.keys;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.formSignIn = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  logIn() {
    let email = this.formSignIn.value.email;
    let password = this.formSignIn.value.password;
    return this.userService.logIn(email, password).subscribe((result: any) => {
      // console.log(result);
      if (result != null) {
        this.authService.logIn();
        localStorage.setItem('api_token', result.user.token);
        // localStorage.setItem('userName', result.user.username);
        // this.userService.setCurrentUserName(result.user.username);
        this.userService.next(result.user.username, result.user.image);
        this.router.navigate(['home']);

        // this.userService.getCurrentUser().subscribe(result => {
        //   console.log(result);
        //   // this.userName = result['user'].username;
        //   // this.userService.setCurrentUserName(this.userName);
        // }, (err) => {
        //   console.log(err);
        // });
      }
    }, (err) => {
      this.errors = err.error.errors;
      console.log(err);
    });
  }

}
