/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：猜你喜好桌面组件的命令
*****************************************************/

import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

export default class LikeViewCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:" + "HomeBaseCmd");

        let info = notification.getBody();                  // 解析数据并获得对应的信息
        let infoUnLock = info.needUnLock

        this.sendNotification(AllCommandDefine.LikeViewResponse, ({
            unlock: infoUnLock
        }))
    };
    
}
