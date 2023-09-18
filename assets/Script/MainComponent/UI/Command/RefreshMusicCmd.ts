/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.05.08
功能：刷新音乐命令
*****************************************************/

import { MusicInfo } from "../../../Common/CommonEnum";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RefreshMusicCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute: " + "PauseMusicCmd");
        let info = notification.getBody();
        let musicInfo = info.musicinfo as MusicInfo;

        this.sendNotification(AllCommandDefine.RefreshMusicResponse, ({
            musicinfo: musicInfo
        }))
    }

}
