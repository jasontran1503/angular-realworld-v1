import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';
import { ResultProfile, ResultArticle } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  @Input() favorited: boolean;
  @Input() favoritesCount: number;
  @Input() slug;
  @Output() toggleFavorite = new EventEmitter<boolean>();

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
  }

  favoriteArticle() {
    if (this.favorited == false) {
      this.articleService.favoriteArticle(this.slug).subscribe((result: ResultArticle) => {
        // console.log(result);
        this.favoritesCount = result.article.favoritesCount;
        this.toggleFavorite.emit(true);
      }, err => {
        console.log(err);
        this.router.navigate(['login']);
      });
    } else {
      this.articleService.unfavoriteArticle(this.slug).subscribe((result: ResultArticle) => {
        // console.log(result);
        this.favoritesCount = result.article.favoritesCount;
        this.toggleFavorite.emit(false);
      }, err => {
        console.log(err);
        this.router.navigate(['login']);
      });
    }
  }


}
