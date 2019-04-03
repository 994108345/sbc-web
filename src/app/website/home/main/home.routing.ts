/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeMainComponent} from './main/home.main.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeMainComponent,
    children: [
      {path: 'index',loadChildren: 'src/app/website/home/index/home.index.module#HomeIndexModule',},
      {path: 'article',loadChildren: 'src/app/website/home/article/home.article.module#HomeArticleModule',},
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
export class HomeRouting { }
