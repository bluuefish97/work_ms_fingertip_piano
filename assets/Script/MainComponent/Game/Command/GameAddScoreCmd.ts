/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.26
功能：游戏内增加分数控制
*****************************************************/

import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

export default class GameAddScoreCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:  " + "GameAddScoreCmd");

        let info = notification.getBody();                              // 解析数据并获得对应的信息
        let infoType = info.type;
        let infoRate = info.rate;

        this.sendNotification(AllCommandDefine.GameAddScoreResponse, ({
            type: infoType,
            rate: infoRate
        }))
    };

}
