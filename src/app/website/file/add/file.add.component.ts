import {Component, Injector} from '@angular/core';
import {AbstractComponent} from '../../../common/service/abstract.component';
import {routers, urls} from '../../../app.config';
import {successStatus} from '../../../common/service/base/common.config';

@Component({
  selector: 'web-file-add',
  templateUrl: './file.add.html',
  styleUrls: ['./file.add.css']
})
export class FileAddComponent extends AbstractComponent{
  //上传文件集合
  uploadedFiles: any[] = [];
  //上传路由
  uploadUrl:string = urls.uploadFileUrl;

  //是否启用上传
  isUpload:boolean = false;

  //要上传的文件
  uploadingFiles:File[] = [];

  //上传文件容量超出提示文本
  invalidFileSizeMessageDetail:string = "maximum upload size is 50M";

  /*初始化必须加，初始化基类的数据*/
  constructor(public injector:Injector){
    super(injector);
  }


  ngOnInit(){
    console.log("文件上传新增界面");
  }

  //文件上传后处理逻辑
  onUpload(event) {
    if(event){
      let response = event.xhr.response;
      if(response){
        //字符串转json对象
        response = this.toJsonObject(response);
        if(response.status == successStatus){
          for(let file of event.files) {
            this.uploadedFiles.push(file);
          }
          this.wzlNgZorroAntdMessage.info("上传成功");
        }else{
          this.wzlNgZorroAntdMessage.error("上传出现异常"+ response.message);
        }
      }else{
        this.wzlNgZorroAntdMessage.error("上传出现异常");
      }
    }else{
      this.wzlNgZorroAntdMessage.error("上传出现异常");
    }
  }

  //上传前
  onBeforeUpload(event){
    console.log(event);
  }

  //上传时发送系统错误
  onError(event){
    this.wzlNgZorroAntdMessage.error("上传时，系统发生异常");
  }

  //文件发送前
  onSelect(event){
  }

}
