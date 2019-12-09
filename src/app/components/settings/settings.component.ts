import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResultUser, User } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  formSettings: FormGroup;
  errors;
  token;
  currentUser: User;
  objectKeys = Object.keys;

  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.formSettings = this.fb.group({
      imgURL: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.token = localStorage.getItem('api_token');
    this.userService.getCurrentUser().subscribe((result: ResultUser) => {
      console.log(result);
      this.currentUser = result.user;
      this.formSettings.setValue({
        imgURL: this.currentUser.image,
        userName: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: this.formSettings.value.password,
      })
    });

  }

  updateUser() {
    let imgURL = this.formSettings.value.imgURL;
    let userName = this.formSettings.value.userName;
    let bio = this.formSettings.value.bio;
    let email = this.formSettings.value.email;
    let password = this.formSettings.value.password;
    console.log(this.formSettings.value);
    return this.userService.updateUser(imgURL, userName, bio, email, password).subscribe(result => {
      console.log(result);
      this.userService.next(result['user']['username'], result['user']['image']);
      // console.log(this.userService.next(result['user']['username']));
      this.router.navigate(['/', 'profile', userName]);
    }, (err) => {
      console.log(err);
      this.errors = err.error.errors;
    })
  }

  logOut() {
    localStorage.removeItem('api_token');
    localStorage.removeItem('userName');
    // this.userService.setCurrentUserName('');
    // this.userService.getCurrentUserName();
    this.authService.logOut();
    confirm("Are you sure you want to log out???");
    this.router.navigate(['home']);
  }

}
