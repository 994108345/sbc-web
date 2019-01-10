import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RedisComponent} from './redis.component';
import {RedisMainComponent} from './main/redis.main.component';
import {RedisSeckillComponent} from './seckill/redis.seckill.component';


export const redisRoutes: Routes = [
  {
    path: '',
    component: RedisComponent,
    children:[
      {path:'seckill',component: RedisSeckillComponent},
      {path:'',component: RedisMainComponent},
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(redisRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RedisRouterModule {}
