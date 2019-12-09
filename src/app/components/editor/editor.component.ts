import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultArticle, Article } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  formEditor: FormGroup;
  slug: string;
  articleBySlug: Article;
  tagList: string[] = [];
  articleBySlugTags;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.formEditor = this.fb.group({
      articleTitle: ['', [Validators.required]],
      articleAbout: ['', [Validators.required]],
      articleContent: ['', [Validators.required]],
      tags: ['', [Validators.required]],
    });

    this.activatedRoute.params.subscribe(params => {
      this.slug = params.slug;
      if (this.slug == undefined) {
        this.slug = '';
      }
    });

    this.getArticle();

  }

  enterTag(event) {
    let tag = event.target.value;
    if (!this.slug) {
      this.tagList.push(tag);
    }
    if (this.slug) {
      this.articleBySlugTags.push(tag);
    }
    event.target.value = '';
  }

  deleteTag(index) {
    if (!this.slug) {
      this.tagList.splice(index, 1);
    } else {
      this.articleBySlugTags.splice(index, 1);
    }
  }

  getArticle() {
    this.articleService.getArticle(this.slug).subscribe((result: ResultArticle) => {
      // console.log(result);
      this.articleBySlug = result.article;
      if (this.slug) {
        this.articleBySlugTags = this.articleBySlug.tagList;
      }
      if (this.slug) {
        this.formEditor.setValue({
          articleTitle: this.articleBySlug.title,
          articleAbout: this.articleBySlug.description,
          articleContent: this.articleBySlug.body,
          tags: '',
        })
      }
    }, err => {
      console.log(err);
    })
  }

  onEdit() {
    if(this.slug) {
      this.updateArticle();
    } else {
      this.createArticle();
    }
  }

  createArticle() {
    let articleTitle = this.formEditor.value.articleTitle;
    let articleAbout = this.formEditor.value.articleAbout;
    let articleContent = this.formEditor.value.articleContent;
    let tags = this.tagList;
    this.articleService.createArticle(articleTitle, articleAbout, articleContent, tags).subscribe((result: Article) => {
      // console.log(result);
    }, err => {
      console.log(err);
    });
    this.router.navigate(['home']);
  }

  updateArticle() {
    let articleTitle = this.formEditor.value.articleTitle;
    let articleAbout = this.formEditor.value.articleAbout;
    let articleContent = this.formEditor.value.articleContent;
    let articleTags = this.articleBySlugTags;
    this.articleService.updateArticle(articleTitle, articleAbout, articleContent, articleTags, this.slug).subscribe((result: Article) => {
      // console.log(result);
    }, err => {
      console.log(err);
    });
    this.router.navigate(['/', 'article', this.slug]);
  }

}
