import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EditorComponent } from './components/editor/editor.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ArticleComponent } from './components/article/article.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'editor/:slug', component: EditorComponent, canActivate: [LoginGuard] },
  { path: 'editor', component: EditorComponent, canActivate: [LoginGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [LoginGuard] },
  { path: 'register', component: SignUpComponent },
  { path: 'login', component: SignInComponent },
  { path: 'profile/:name', component: ProfileComponent },
  { path: 'article/:slug', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
