import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditorComponent } from './components/editor/editor.component';
import { ArticleComponent } from './components/article/article.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ListsArticlesComponent } from './components/lists-articles/lists-articles.component';
import { FooterComponent } from './components/footer/footer.component';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    ProfileComponent,
    EditorComponent,
    ArticleComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    ListsArticlesComponent,
    FooterComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
