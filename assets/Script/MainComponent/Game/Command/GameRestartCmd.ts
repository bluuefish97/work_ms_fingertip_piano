/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.26
功能：游戏重新开始的控制
*****************************************************/

import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";

export default class GameRestartCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:  " + "GameRestartCmd");

    };
    
}
