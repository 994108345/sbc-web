import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


export const BrandRoutes: Routes = [
  {
    path: '',
    component: BrandComponent,
    children:[
      {path:'seckill',component: RedisSeckillComponent},
      {path:'',component: RedisMainComponent},
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
