import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {routers, urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'web-file',
  templateUrl: './file.main.html',
  styleUrls: ['./file.main.css']
})
export class FileMainComponent extends AbstractComponent{

  //删除弹出窗是否显示
  isDeleteVisible:boolean = false;

  //删除的对象
  deleteObj:any;

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("文章类型界面");
    /*初始化路径*/
    urls.queryUrl = urls.queryFileUrl;
    /*查询*/
    this.queryBySearchParam();
  }

  /**
   * 新增品牌
   */
  addFile(){
    if(routers.fileAddRouter){
      this.router.navigate([routers.fileAddRouter]);
    }else{
      this.wzlNgZorroAntdMessage.error("新增文件路由没有配置")
    }
  }

  /*跳到编辑页面*/
  editArticleType(data,isEdit){
    this.wzlCache.setCache("articleType",data);
    if(isEdit){
      this.wzlCache.setCache("isEdit",true);
      this.router.navigate([routers.articleTypeEditRouter]);
    }else{
      this.wzlCache.setCache("isEdit",false);
      this.router.navigate([routers.articleTypeViewRouter]);
    }
  }

  /**
   * 删除文章类型
   */
  deleteFile(){
    if(urls.deleteFileUrl){
      let condition = {fileCode:this.deleteObj.fileCode};
      this.commonService.doHttpPost(urls.deleteFileUrl,condition).then(rst => {
        if(rst){
          if(rst.status != successStatus){
            this.wzlNgZorroAntdMessage.error(rst.message);
          }else{
            this.wzlNgZorroAntdMessage.success('删除成功');
            this.queryBySearchParam();
          }
        }else{
          this.wzlNgZorroAntdMessage.error("返回参数异常，请联系管理员");
        }
      }).catch(rtc =>{
        this.wzlNgZorroAntdMessage.error("http请求出现异常，请联系管理员");
      })
    }else{
      this.wzlNgZorroAntdMessage.error("路由没有配置，请联系管理员");
    }
  }
  //选择删除
  choseDelete(event){
    this.deleteObj = event;
    this.isDeleteVisible = true;
  }

  //取消删除弹出窗
  deleteCancel(){
    this.isDeleteVisible = false;
  }
  //确定删除弹出窗
  deleteConfirm(event){
    this.deleteFile();
    this.isDeleteVisible = false;
  }
}
