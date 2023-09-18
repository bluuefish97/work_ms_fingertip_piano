/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.03.10
功能：播放音乐命令
*****************************************************/


import { MusicInfo } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import audioEngineMamager from "../../../Expand/audioEngineMamager";
import DonaldManager from "../../../Expand/DownloadManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

export default class PlayMusicCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute: " + "PlayMusicCmd");
        let info = notification.getBody();
        let musicInfo = info.musicinfo as MusicInfo;
        let musicFile = musicInfo.MusicFile;
        let musicId = musicInfo.MusicId;
        let musicListen = musicInfo.ListenTime;
        let needSetTime = info.needSetTime;

        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "song_request", 1);

        CommonGlobal.getInstance().playingMusicId = musicId;
        const loadCall = (err, res) => {
            if (CommonGlobal.getInstance().isGameing == false) {
                audioEngineMamager.getInstance().pauseMusic();
                audioEngineMamager.getInstance().playMusic(res, true);
                audioEngineMamager.getInstance().setMusicVolume(CommonGlobal.getInstance().userData.BgSoundScale);
                if (needSetTime == true) {
                    audioEngineMamager.getInstance().setMusicTime(musicListen);
                }

                this.sendNotification(AllCommandDefine.PlayMusicReponse, ({
                    musicinfo: musicInfo
                }))

                AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "song_response", 1);
            }
        }

        DonaldManager.loadMusic(musicFile, musicId, loadCall);
    }

}
