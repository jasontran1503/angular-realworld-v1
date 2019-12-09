import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResultUser } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUserName;
  token;
  currentUserImage: string;

  constructor(public authService: AuthService, public userService: UserService, private router: Router) { 
  }

  ngOnInit() {
    this.token = localStorage.getItem('api_token');
    this.getCurrentUser();
    this.userService.subject.subscribe(result => {
      this.currentUserName = result['name'];
      this.currentUserImage = result['image'];
    });
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((result: ResultUser) => {
      this.currentUserName = result.user.username;
      this.currentUserImage = result.user.image;
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
