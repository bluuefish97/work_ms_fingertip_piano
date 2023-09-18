/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.05
功能：奖励宝盒界面的命令
*****************************************************/

import AdManager from "../../../Expand/AdManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";

export default class RewardBoxCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:" + "RewardBoxCmd");

        let info = notification.getBody();                  // 解析数据并获得对应的信息
        let infoCall = info.curCall;

        AdManager.showVideo((isEnd) => {
            if (isEnd) {
                infoCall && infoCall()
            }
        })

    };
}
