/**
 * Created by tomfang on 2017-08-18.
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ArticletypeComponent} from './articletype.component';
import {ArticletypeMainComponent} from './main/articletype.main.component';
import {ArticletypeAddComponent} from './add/articletype.add.component';
import {ArticletypeEditComponent} from './edit/articletype.edit.component';

const brandRoutes: Routes = [
  {
    path: '',
    component: ArticletypeComponent,
    children: [
      {path: 'edit', component: ArticletypeEditComponent},
      {path: 'view', component: ArticletypeEditComponent},
      {path: 'add', component: ArticletypeAddComponent},
      {path: '', component: ArticletypeMainComponent},
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
export class ArticletypeRouter { }
