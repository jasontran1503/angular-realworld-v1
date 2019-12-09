import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ResultArticle, ResultComment, ResultTag, Article, Comment, ResultProfile, ResultComments, ResultUser } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  formArticle: FormGroup;
  articleContent: Article;
  articleClicked: string;
  userClicked: string;
  currentUserName: string;
  comments: Comment[];
  idComment: number;
  token: string;
  favorited = false;
  favoritesCount: number;
  tagList: string[];
  following: boolean;
  slug: string;
  currentUserImg: string;

  constructor(private fb: FormBuilder, private articleService: ArticleService,
    private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.formArticle = this.fb.group({
      comment: ['', [Validators.required]],
    });

    this.currentUserName = this.userService.getCurrentUserName();
    this.token = localStorage.getItem('api_token');
    this.getCurrentUser();

    this.activatedRoute.params.subscribe(params => {
      this.articleClicked = params.slug;
      this.getArticle();
      this.getComments();
    });

  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((result: ResultUser) => {
      // console.log(result);
      this.currentUserName = result.user.username;
      this.currentUserImg = result.user.image;
    })
  }

  onFollow(following: boolean) {
    this.following = following;
  }

  onFavorite(favorited: boolean) {
    this.favorited = favorited;
  }

  getArticle() {
    this.articleService.getArticle(this.articleClicked).subscribe((result: ResultArticle) => {
      // console.log(result);
      this.tagList = result.article.tagList;
      this.userClicked = result.article.author.username;
      this.slug = result.article.slug;
      this.articleContent = result.article;
      this.following = this.articleContent.author.following;
      this.favorited = result.article.favorited;
      // console.log(this.favorited);
    })
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.articleClicked).subscribe(result => {
      // console.log(result);
      confirm("Are you sure???")
      this.router.navigate(['home']);
    }, err => {
      console.log(err);
    });
  }

  getComments() {
    return this.articleService.getComments(this.articleClicked).subscribe((result: ResultComments) => {
      // console.log(result);
      this.comments = result.comments;
      // this.idComment = res
    }, err => {
      console.log(err);
    });
  }

  addComments() {
    let body = this.formArticle.value.comment;
    this.articleService.addComments(this.articleClicked, body).subscribe((result: ResultComment) => {
      this.getComments();
      console.log(result);
      // this.comments.unshift(result);
      // console.log(this.comments);
      this.formArticle.reset();
    }, err => {
      console.log(err);
    });
  }

  deleteComment(index) {
    let slug = this.articleClicked;
    let idComment = this.comments[index]['id'];
    this.articleService.deleteComment(slug, idComment).subscribe(result => {
      console.log(result);
      this.getComments();
    }, err => {
      console.log(err);
    });
  }

}
