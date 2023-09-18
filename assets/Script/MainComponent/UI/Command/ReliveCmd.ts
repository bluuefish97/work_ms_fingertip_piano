/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.22
功能：复活界面的控制器
*****************************************************/

import AdManager from "../../../Expand/AdManager";
import DiamondManager from "../../../Expand/DiamondManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

export default class ReliveCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:" + "ReliveCmd");

        let info = notification.getBody();                  // 解析数据并获得对应的信息
        let infoType = info.type;
        let infoCost = info.cost;
        let infoCall = info.curCall;

        // 视频复活
        if (infoType == "video") {
            if (AdManager.hasVideo()) {
                AdManager.showVideo((isEnd) => {
                    if (isEnd) {
                        this.sendNotification(AllCommandDefine.ReliveResponse, ({
                            isRelive: true
                        }))
                    } else {
                        infoCall && infoCall()
                    }
                })
            } else {
                infoCall && infoCall()
            }
        }
        // 钻石复活
        else if (infoType == "diamond") {
            let diamondCall = () => {
                this.sendNotification(AllCommandDefine.ReliveResponse, ({
                    isRelive: true
                }))
            }

            DiamondManager.getInstance().reduceDiamond(infoCost, diamondCall)
        }
        // 放弃复活
        else if (infoType == "giveup") {
            this.sendNotification(AllCommandDefine.ReliveResponse, ({
                isRelive: false
            }))
        }
    };

}
