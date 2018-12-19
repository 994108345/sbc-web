import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagenotfoundComponent} from './common/login/pagenotfound/pagenotfound.component';


export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: 'src/app/common/login/login/login.module#LoginModule',
  },
  {
    path: 'menus',
    loadChildren: 'src/app/common/menus/menus.module#MenusModule',
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
