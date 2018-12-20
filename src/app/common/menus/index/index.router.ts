import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IndexMainComponent} from './main/index.main.component';

const menuIndexRoutes: Routes = [
  {
    path:'',
    component:IndexMainComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(menuIndexRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IndexRouterModule { }
