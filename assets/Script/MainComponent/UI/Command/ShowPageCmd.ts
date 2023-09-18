/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：展示主界面的控制器
*****************************************************/

import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShowHomePageCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:" + "ShowPageCmd");

        let info = notification.getBody();                  // 解析数据并获得对应的信息
        let pageNum = info.showPageNum;
        let pageFunc = info.curCall;

        this.sendNotification(AllCommandDefine.ShowPageResponse, ({
            showPageNum: pageNum,
            curCall: pageFunc
        }))
    }

}
