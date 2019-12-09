import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ResultProfile } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  @Input() following: boolean;
  @Input() userClicked;
  @Output() toggleFollow = new EventEmitter<boolean>();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  followUser() {
    if (this.following == false) {
      this.userService.followUser(this.userClicked).subscribe((result: ResultProfile) => {
        // console.log(result);
        this.toggleFollow.emit(true);
      }, err => {
        console.log(err);
        this.router.navigate(['login']);
      });
    } else {
      this.userService.unfollowUser(this.userClicked).subscribe((result: ResultProfile) => {
        // console.log(result);
        this.toggleFollow.emit(false);
      }, err => {
        console.log(err);
        this.router.navigate(['login']);
      });
    }

  }
}
