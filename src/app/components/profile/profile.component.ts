import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Profile, ResultProfile, ResultUser } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser;
  currentUserName;
  userProfile: Profile;
  userNameClicked: Profile;
  following: boolean = false;
  checkArticles = 1;
  myArticles;
  favoritedArticles;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute
    , private router: Router, private articleService: ArticleService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userNameClicked = params.name;
      this.getProfile();
    }, err => {
      console.log(err);
    });

    if (this.userService.getCurrentUser() !== undefined) {
      this.getCurrentUser();
    }
  }

  getProfile() {
    this.userService.getProfile(this.userNameClicked).subscribe((result: ResultProfile) => {
      // console.log(result);
      this.userProfile = result.profile;
      this.following = result.profile.following;
    }, err => {
      console.log(err);
    });
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((result: ResultUser) => {
      // console.log(result);
      this.currentUser = result.user;
      this.currentUserName = result.user.username;
      this.userService.setCurrentUserName(this.currentUserName);
    }, err => {
      console.log(err);
    });
  }

  onFollow(following: boolean) {
    this.following = following;
  }

  showMyArticles() {
    this.checkArticles = 1;
  }

  showFavoritedArticles() {
    this.checkArticles = 2;
  }

}
