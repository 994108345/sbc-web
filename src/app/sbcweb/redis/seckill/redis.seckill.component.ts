import {Component, Injector, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {ChatboardRoot, successStatus} from '../../../common/service/base/common.config';
import {cacheKey, routers, urls} from '../../../app.config';
import {seckill_Cols} from '../redis.main.config';

@Component({
  templateUrl: './redis.seckill.html',
  styleUrls: ['../../../app.component.css','./redis.seckill.css']
})
export class RedisSeckillComponent extends AbstractComponent{

  /*表头*/
  seckillCols = seckill_Cols;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }

  ngOnInit() {
    console.log("redis秒杀界面");

  }

  /*秒杀*/
  secKill(){
    let condition = {};
    this.commonService.doHttpPost(urls.seckillUrl,condition).then(rst => {
      if(rst){
        if(rst.status != successStatus){
          this.wzlAlert.error(rst.message);
        }else{
          this.wzlAlert.success("秒杀成功");
          this.orders = rst.data;
        }
      }else{
        this.wzlAlert.success("返回参数异常，请联系管理员");
      }
    }).catch(rtc =>{
      this.wzlAlert.error("http请求出现异常，请联系管理员");
    })
  }
}
