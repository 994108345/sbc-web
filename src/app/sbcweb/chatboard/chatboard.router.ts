import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChatboardComponent} from './chatboard.component';
import {ChatboardMainComponent} from './main/chatboard.main.component';
import {ChatboardAddComponent} from './add/chatboard.add.component';


export const chatboardRoutes: Routes = [
  {
    path: '',
    component: ChatboardComponent,
    children:[
      {path:'add',component: ChatboardAddComponent},
      {path:'',component: ChatboardMainComponent},
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(chatboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatboardRouterModule {}
