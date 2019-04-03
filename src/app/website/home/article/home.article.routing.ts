/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeArticleMainComponent} from './main/home.article.main.component';
import {HomeArticleComponent} from './home.article.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeArticleComponent,
    children: [
      {path: '',component: HomeArticleMainComponent,},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeArticleRouting { }
