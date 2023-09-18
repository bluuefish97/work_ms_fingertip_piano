/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.02.23
功能：加载游戏界面命令
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import DownloadManager from "../../../Expand/DownloadManager";
import MusicManager, { MusicType } from "../../../Expand/MusicManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import Load from "../../../SceneScript/Load";

export default class LoadGameCmd extends SimpleCommand {

    /** 需要加载的音乐json */
    private musicStr: string = "";
    /** 需要加载的音乐的ID */
    private musicID: string = "";
    /** 需要加载节奏点json */
    private pointStr: string = "";

    /** 表当前音乐是否加载成功 */
    private loadMusicOK: boolean = false;
    /** 表当前音乐的节奏点的加载进度 */
    private loadPointOK: boolean = false;
    /** 表当前游戏内的资源是否加载成功 */
    private loadSkinOK: boolean = false;

    public execute(notification: INotification): void {
        console.log("execute: " + "LoadGameCmd");
        console.log("开始加载场景Game")

        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "game_request", 1);
        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "app_request", 1);

        var loadGameFunc = setInterval(() => {
            if (MusicManager.getInstance().checkLoadOK()) {
                this.startLoadGame();
                clearInterval(loadGameFunc)
            }
        }, 100)

        // 加载主界面场景
        cc.director.preloadScene("Game", function (completedCount, totalCount, item) {
            if (Load.getInstance()) {
                var curPer = Math.floor((completedCount * 100) / totalCount);
                if (curPer != 100) {
                    Load.getInstance().setLoadProcess(curPer);
                }
            }
        }, () => {
            if (!MusicManager.getInstance().checkLoadOK() || this.checkLoad()) {
                var musicLoadFunc = setInterval(() => {
                    if (MusicManager.getInstance().checkLoadOK() && this.checkLoad()) {
                        clearInterval(musicLoadFunc)
                        cc.director.loadScene("Game", this.sceneLoadOK.bind(this));
                        if (Load.getInstance()) {
                            Load.getInstance().setPageActive(false);
                        }

                        Load.getInstance().setLoadProcess(100);
                        CommonGlobal.getInstance().isGameing = true;
                    }
                }, 1000)
            } else {
                cc.director.loadScene("Game", this.sceneLoadOK.bind(this));
                if (Load.getInstance()) {
                    Load.getInstance().setPageActive(false);
                }

                Load.getInstance().setLoadProcess(100);
                CommonGlobal.getInstance().isGameing = true;
            }
        });

    };

    /** 开始加载游戏界面 */
    private startLoadGame() {
        let curList = MusicManager.getInstance().getLimitMusicList(MusicType.AllMusic);
        CommonGlobal.getInstance().gameMusicId = curList[0].musicId;
        CommonGlobal.getInstance().gameMusicDataStr = curList[0].musicFile;
        CommonGlobal.getInstance().gameMusicJsonStr = curList[0].json_zjgq;
        CommonGlobal.getInstance().gameHighTime = curList[0].ex_listen;

        CommonGlobal.getInstance().userData.SkinNum = 0;

        this.loadMusic();
        this.loadPoint();
        this.loadSkin();
    };

    /** 检测是否加载完毕 */
    private checkLoad() {
        return this.loadMusicOK && this.loadPointOK && this.loadSkinOK
    };

    /** 加载音乐 */
    private loadMusic() {
        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "song_request", 1);

        const self = this;
        this.musicStr = CommonGlobal.getInstance().gameMusicDataStr;
        this.musicID = CommonGlobal.getInstance().gameMusicId;

        this.loadMusicOK = false;
        const loadMusicCall = (err, res) => {
            console.log("音乐加载成功");
            self.loadMusicOK = true;

            CommonGlobal.getInstance().gameMusicData = res;
            AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "song_response", 1);
        }

        DownloadManager.loadMusic(this.musicStr, this.musicID, loadMusicCall);
    };

    /** 加载节奏点 */
    private loadPoint() {
        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "json_request", 1);

        const self = this;
        this.pointStr = CommonGlobal.getInstance().gameMusicJsonStr;

        this.loadPointOK = false;
        const loadPointCall = (res) => {
            console.log("节奏点加载成功");
            self.loadPointOK = true;

            // 重新设置歌单json文件,以防止有多余的节奏点出现
            CommonGlobal.getInstance().gameMusicJson = [];

            let pointNum = 0;
            for (let i = 0; i < res.length; i++) {
                let curData = res[i];
                if (curData.pressKey != 'listen') {
                    CommonGlobal.getInstance().gameMusicJson[pointNum] = curData;
                    pointNum++
                }
            }

            AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "json_response", 1);
        }

        DownloadManager.loadPoint(this.pointStr, loadPointCall)
    };

    /** 加载游戏内的皮肤资源 */
    private loadSkin() {
        this.loadSkinOK = false;
        DownloadManager.preloadBundleAssetDir("Skin", "", cc.SpriteFrame, (err, res) => {
            this.loadSkinOK = true;
        })
    };

    /** 场景加载完成 */
    private sceneLoadOK() {
        console.log("场景加载完成")

        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "app_response", 1);
        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "game_response", 1);
    };


}
