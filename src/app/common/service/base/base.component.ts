/**
 * Created by wenzailong on 2017/12/20.
 */
import {Injector, OnDestroy} from '@angular/core';

export declare class BaseComponent implements OnDestroy{
  injector: Injector;
  constructor(injector: Injector);
  ngOnDestroy(): void ;
  ngOnInit(): void;

}
