/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ArticleComponent} from './article.component';
import {ArticleMainComponent} from './main/article.main.component';
import {ArticleAddComponent} from './add/article.add.component';
import {ArticleEditComponent} from './edit/article.edit.component';

const brandRoutes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    children: [
      {path: 'info', component: ArticleEditComponent},
      {path: 'add', component: ArticleAddComponent},
      {path: '', component: ArticleMainComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(brandRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticleRouter { }
