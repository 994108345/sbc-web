import {Component, Injector, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {cacheKey, routers, urls} from '../../../app.config';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {successStatus} from '../../../common/service/base/common.config';
import {ArticleAllInfo} from "../main/home.config";

@Component({
  template: '<router-outlet></router-outlet>'
})
export class HomeArticleComponent extends AbstractComponent implements  OnInit{
  constructor(injector:Injector){
    super(injector);
  }
  ngOnInit() {
  }
}
