import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrandComponent} from './brand.component';
import {BrandMainComponent} from './main/brand.main.component';


export const BrandRoutes: Routes = [
  {
    path: '',
    component: BrandComponent,
    children:[
      {path:'',component: BrandMainComponent},
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(BrandRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RedisRouterModule {}
