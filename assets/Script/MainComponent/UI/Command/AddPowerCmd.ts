/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.07
功能：增加体力的命令
*****************************************************/

import AdManager from "../../../Expand/AdManager";
import DiamondManager from "../../../Expand/DiamondManager";
import PowerManager from "../../../Expand/PowerManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

export default class AddPowerCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:" + "AddPowerCmd");

        const self = this;

        let info = notification.getBody();                  // 解析数据并获得对应的信息
        let addType = info.type;
        let addCost = info.cost;
        let addCall = info.call;
        let addReward = info.reward;

        // 对应的回调
        let curCall = () => {
            PowerManager.getInstance().addPower(addReward);
            self.sendNotification(AllCommandDefine.RefreshDiamondResponse);
            self.sendNotification(AllCommandDefine.RefreshPowerResponse,({
                type: addReward
            }));

            addCall && addCall();
        }

        if (addType == "coin") {
            DiamondManager.getInstance().reduceDiamond(addCost, curCall);
        } else if (addType == "video") {
            AdManager.showVideo((isEnd) => {
                if (isEnd) {
                    curCall()
                }
            });
        }

    };

}
