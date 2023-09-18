/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.03.10
功能：暂停音乐命令
*****************************************************/

import { MusicInfo } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import audioEngineMamager from "../../../Expand/audioEngineMamager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";


export default class PauseMusicCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute: " + "PauseMusicCmd");
        let info = notification.getBody();
        let musicInfo = info.musicinfo as MusicInfo;

        audioEngineMamager.getInstance().pauseMusic();
        CommonGlobal.getInstance().playingMusicId = ""

        this.sendNotification(AllCommandDefine.PauseMusicResponse, ({
            musicinfo: musicInfo
        }))
    }
    
}
