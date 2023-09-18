/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.26
功能：游戏复活控制
*****************************************************/

import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

export default class GameReliveCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:  " + "GameReliveCmd");
        this.sendNotification(AllCommandDefine.GameReliveResponse);
    };

}
