/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.07
功能：设置体力显示的命令
*****************************************************/

import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

export default class SetPowerCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute: " + "SetPowerCmd");

        let info = notification.getBody();          // 解析数据并获得对应的歌曲信息和回调
        let curType = info.type;

        this.sendNotification(AllCommandDefine.SetPowerActiveResponse, ({
            type: curType
        }))
    }
    
}
