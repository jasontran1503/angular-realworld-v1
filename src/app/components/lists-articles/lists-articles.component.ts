import { Component, OnInit, Input } from '@angular/core';
import { Article, ResultArticles } from 'src/app/interface/interface.component';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-lists-articles',
  templateUrl: './lists-articles.component.html',
  styleUrls: ['./lists-articles.component.css']
})
export class ListsArticlesComponent implements OnInit {

  @Input() checkFeed: number;
  @Input() checkArticles: number;
  @Input() userNameClicked: string;
  @Input() tag: string;
  limit = 10;
  listArticles: Article[];
  numPage;
  numClicked = 0;
  favoritesCount: number;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.getListArticles();
  }

  getListArticles(offset = 0) {
    if (this.checkFeed == 1) {
      this.articleService.getArticles('feed', '', '', '', this.limit, offset).subscribe((result: ResultArticles) => {
        console.log(result);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }

    if (this.checkFeed == 2) {
      this.articleService.getArticles('', '', '', '', this.limit, offset).subscribe((result: ResultArticles) => {
        console.log(result);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }

    if (this.checkFeed == 3) {
      this.articleService.getArticles('', this.tag, '', '', this.limit, offset).subscribe((result: ResultArticles) => {
        // console.log(result);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }

    if (this.checkArticles == 1) {
      this.articleService.getArticles('', '', this.userNameClicked, '', this.limit, offset).subscribe((result: ResultArticles) => {
        // console.log(result);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }

    if (this.checkArticles == 2) {
      this.articleService.getArticles('', '', '', this.userNameClicked, this.limit, offset).subscribe((result: ResultArticles) => {
        // console.log(result);
        this.showList(result);
      }, err => {
        console.log(err);
      });
    }
  }

  showList(result: ResultArticles) {
    this.listArticles = result.articles;
    // this.listArticles.forEach(element => {
    //   this.favoritesCount = element.favoritesCount;
    // });
    this.numPage = Math.ceil(result.articlesCount / this.limit);
    this.numPage = Array(this.numPage).fill(0).map((x, i) => i);
  }

  clickPage(index: number) {
    this.numClicked = index;
    this.getListArticles(index * this.limit);
  }

  onFavorite(favorited: boolean, article: Article) {
    article.favorited = favorited;
    if (favorited) {
      article.favoritesCount++;
    } else {
      article.favoritesCount--;
    }
  }

}
