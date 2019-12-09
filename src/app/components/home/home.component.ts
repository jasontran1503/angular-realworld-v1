import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResultTag, Article, ResultArticles } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tagArticles: Article[];
  token: string;
  checkFeed = 2;
  tagList: string[];
  tag: string;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.token = localStorage.getItem('api_token');
    this.getTags();
  }

  getTags() {
    this.articleService.getTags().subscribe((result: ResultTag) => {
      // console.log(result);
      this.tagList = result.tags;
    }, err => {
      console.log(err);
      // this.router.navigate(['login']);
    });
  }

  showYourFeed() {
    this.checkFeed = 1;
  }

  showGlobalFeed() {
    this.checkFeed = 2;
  }

  showTagFeed(tag) {
    this.checkFeed = 3;
    this.tag = tag;
  }

}
