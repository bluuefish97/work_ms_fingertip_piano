/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.29
功能：加载游戏资源的中介
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import DownloadManager from "../../../Expand/DownloadManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import Game from "../../../SceneScript/Game";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import LoadingPage from "../Page/LoadingPage";

export default class LoadingPageMediator extends Mediator {

    /** 加载游戏资源界面 */
    private curPage: LoadingPage = null;

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

    /** 加载进度的百分比 */
    private loadNum = 0;

    /** 加载下一个场景的方法 */
    private loadSceneFunc = null;
    /** 假的加载动画方法 */
    private loadLBFunc = null;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(LoadingPage);
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.GameResetOKResponse,
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        let name = notification.getName();
        switch (name) {
            case AllCommandDefine.GameResetOKResponse:
                this.setPageActive(false);
                break

            default:
                break;
        }
    };


    /** 开始加载游戏界面 */
    public startLoadGame() {
        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "game_request", 1);

        CommonGlobal.getInstance().isGameing = true;

        this.loadMusic();
        this.loadPoint();
        this.loadSkin();
        this.loadScene();

        CommonFacade.getInstance().sendNotification(AllCommandDefine.SetDiamondActiveRequest, ({
            type: false
        }))

        CommonFacade.getInstance().sendNotification(AllCommandDefine.SetPowerActiveRequest, ({
            type: false
        }))

        AudioPlayManager.playLoadingAU();
    };

    /** 加载音乐 */
    private loadMusic() {
        // this.loadMusicOK = true;
        // return

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
        // this.loadPointOK = true;
        // return

        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "json_request", 1);

        const self = this;
        this.pointStr = CommonGlobal.getInstance().gameMusicJsonStr;

        this.loadPointOK = false;
        const loadPointCall = (res) => {
            console.log("节奏点加载成功");
            self.loadPointOK = true;

            // CommonGlobal.getInstance().gameMusicJson = res;

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

    /** 加载游戏场景 */
    private loadScene() {
        const self = this;
        if (!Game.getInstance()) {
            cc.director.preloadScene("Game", function (completedCount, totalCount, item) {
                let perNum = Math.floor((completedCount / totalCount) * 100)
                if (perNum != 100) {
                    self.curPage.setProgressBar(perNum);
                }
            }, () => {
                // 开始进入游戏场景
                self.loadSceneFunc = setInterval(() => {
                    if (self.loadMusicOK == true && self.loadPointOK == true && self.loadSkinOK == true) {
                        self.curPage.setProgressBar(100);
                        self.switchScene();
                        AudioPlayManager.stopLoadingAU();
                    }
                }, 1000)
            });
        } else {

            // 假加载动画
            self.loadNum = 0;
            self.loadLBFunc = setInterval(() => {
                self.loadNum++
                self.curPage.setProgressBar(self.loadNum);

                if (self.loadNum >= 98) {
                    clearInterval(self.loadLBFunc);
                }
            }, 10)

            // 开始进入游戏场景
            self.loadSceneFunc = setInterval(() => {
                if (self.loadMusicOK == true && self.loadPointOK == true && self.loadSkinOK == true) {
                    console.log("游戏加载完成");

                    self.curPage.setProgressBar(100);
                    clearInterval(self.loadSceneFunc);
                    AudioPlayManager.stopLoadingAU();
                    Game.getInstance().setPageActive(true);

                    AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "game_response", 1);
                }

            }, 1000)
        }
    };

    /** 切换入游戏场景 */
    private switchScene() {
        clearInterval(this.loadSceneFunc);
        console.log("游戏资源加载完成");
        cc.director.loadScene("Game");

        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "game_response", 1);
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);
    };

}
