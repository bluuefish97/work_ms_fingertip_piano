/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.03.10
功能：偏好音乐设置命令
*****************************************************/


import { MusicInfo } from "../../../Common/CommonEnum";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import MusicManager from "../../../Expand/MusicManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";


export default class FavourMusicCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute: " + "FavourMusicCmd");
        let info = notification.getBody();
        let musicInfo = info.musicinfo as MusicInfo;

        this.sendNotification(AllCommandDefine.FavourMusicResponse, ({
            musicinfo: musicInfo
        }))

        MusicManager.getInstance().saveMusicData(musicInfo);

        if (musicInfo.IsLike == true) {
            AudioPlayManager.playFavourAU();
        }

    }
}
