/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.02.23
功能：加载主界面命令
*****************************************************/

import TipsManager from "../../../Common/TipsManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import DownloadManager from "../../../Expand/DownloadManager";
import MusicManager from "../../../Expand/MusicManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import Load from "../../../SceneScript/Load";

export default class LoadHomeCmd extends SimpleCommand {

    /** 预制预加载完成 */
    private prefabLoadOK: boolean = false;

    public execute(notification: INotification): void {
        console.log("execute: " + "LoadHomeCmd");
        console.log("开始加载场景Home")

        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "app_request", 1);

        Load.getInstance().setPageActive(true);

        this.prefabLoadOK = false;
        this.preloadHomePrefab();

        const self = this;
        // 加载主界面场景
        cc.director.preloadScene("Home", function (completedCount, totalCount, item) {
            if (completedCount == totalCount) {
                console.log("主场景预加载完成")
            }
        }, () => {
            if (!MusicManager.getInstance().checkLoadOK() || this.prefabLoadOK == false) {
                var musicLoadFunc = setInterval(() => {
                    if (MusicManager.getInstance().checkLoadOK() && this.prefabLoadOK == true) {
                        clearInterval(musicLoadFunc)
                        cc.director.loadScene("Home", self.sceneLoadOK.bind(self));
                    }
                }, 1000)
            } else {
                if (this.prefabLoadOK == true) {
                    cc.director.loadScene("Home", self.sceneLoadOK.bind(self));
                }
            }
        });

    };

    /** 场景加载完成 */
    private sceneLoadOK() {
        console.log("场景加载完成");
        TipsManager.getInstance().showTips("场景加载完成", 1, true);

        Load.getInstance().setPageActive(false);
        AnalyticsManager.getInstance().reportAnalytics("net_eventAnalytics", "app_response", 1);
    };

    /** 对主界面预制进行预加载操作 */
    private preloadHomePrefab() {
        const loadFunc = (percelNum) => {
            if (percelNum == 100) {
                this.prefabLoadOK = true;
            } else {
                Load.getInstance().setLoadProcess(percelNum);
            }
        }
        DownloadManager.preloadAllData(loadFunc);
    };

}
