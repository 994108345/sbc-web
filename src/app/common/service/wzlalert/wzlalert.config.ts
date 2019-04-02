/*信息提示框*/
import {Message} from 'primeng/api';

export class MessageInfo {
  severity:string = 'success';//信息提示框类别，包括：success、articleinfo、error、warn
  summary:string = 'Service Message';//提示信息标题
  detail:string = 'MessageService';//具体提示信息
}

/*消息提示框*/
export const msgInfo: Message[] = [];

