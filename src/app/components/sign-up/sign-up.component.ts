import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formSignUp: FormGroup;
  errors;
  objectKeys = Object.keys;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.formSignUp = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  signUp() {
    let username = this.formSignUp.value.username;
    let email = this.formSignUp.value.email;
    let password = this.formSignUp.value.password;
    return this.userService.register(username, email, password).subscribe((result: any) => {
      if (result != null) {
        alert("Created account is completed!!!")
        this.router.navigate(['login']);
      }
    }, (err) => {
      this.errors = err.error.errors;
    })
  }

}
