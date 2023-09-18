/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.23
功能：增加钻石的命令
*****************************************************/

import AdManager from "../../../Expand/AdManager";
import DiamondManager from "../../../Expand/DiamondManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AddDiamondCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:" + "AddDiamondCmd");

        let info = notification.getBody();                  // 解析数据并获得对应的信息
        let addCall = info.call
        let addReward = info.reward

        const self = this
        if (AdManager.hasVideo()) {
            AdManager.showVideo((isEnd) => {
                if (isEnd) {
                    addCall && addCall()
                    DiamondManager.getInstance().addDiamond(addReward)

                    self.sendNotification(AllCommandDefine.RefreshDiamondResponse, ({
                        type: addReward
                    }))
                }
            })
        }
    };

}
