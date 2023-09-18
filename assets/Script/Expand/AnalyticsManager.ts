/****************************************************
文件：AnalyticsManager.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.05
功能：事件上报管理
*****************************************************/

import { Platform } from "../Common/CommonEnum";
import CommonGlobal from "../Common/CommonGlobal";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnalyticsManager {

    private static instance: AnalyticsManager
    public static getInstance(): AnalyticsManager {
        if (!AnalyticsManager.instance) {
            AnalyticsManager.instance = new AnalyticsManager()
        }
        return AnalyticsManager.instance
    }

    /**
     * 上报事件
     * @param evtName 事件类型
     * @param evtData 事件类型中的数据类型
     * @param data 所传递的数据
     */
    public reportAnalytics(evtName: string, evtData: string, data: any) {
        // 字节跳动
        if (CommonGlobal.getInstance().platform == Platform.Douyin || CommonGlobal.getInstance().platform == Platform.Web) {
            let reportData: any = null;
            switch (evtName) {
                case "net_eventAnalytics":
                    reportData = {
                        app_request: "0",
                        app_response: "0",
                        song_request: "0",
                        song_response: "0",
                        json_request: "0",
                        json_response: "0",
                        game_request: "0",
                        game_response: "0",
                    }
                    break

                case "viewShow_eventAnalytics":
                    reportData = {
                        main: "0",
                        failPassList: "0",
                        passList: "0",
                        collectList: "0",
                        allsongList: "0",
                        revive: "0",
                        fail: "0",
                        pass: "0",
                        diabank: "0",
                        powerbank: "0",
                        newSongBank: "0",
                        powerbank_noPower: "0",
                    }
                    break

                case "btnClick_eventAnalytics":
                    reportData = {
                        dia: "0",
                        main: "0",
                        lists: "0",
                        startSong: "0",
                        diaUnlock: "0",
                        lookAll: "0",
                        change: "0",
                        treasurebox: "0",
                        treasureGet: "0",
                        failPassList: "0",
                        passList: "0",
                        collectList: "0",
                        allsongList: "0",
                        cancalRevive: "0",
                        back: "0",
                        again: "0",
                        powerGet: "0",
                    }
                    break

                case "adBtnClick_eventAnalytics":
                    reportData = {
                        songUnlock: "0",
                        settleNewSong: "0",
                        diaGet: "0",
                        revive: "0",
                        treasureGet: "0",
                        powerGet: "0",
                        newSongGet: "0",
                        songUnlock_settle: "0",
                    }
                    break

                default:
                    break
            }

            if (!reportData) {
                console.log("当前事件不存在");
            } else {
                reportData[evtData] = data;
                if (CommonGlobal.getInstance().platform == Platform.Douyin) {
                    if (typeof "tt" != undefined) {
                        //@ts-ignore
                        tt.reportAnalytics(evtName, reportData);
                        console.log("数据上传成功")
                    }
                }

                console.log("reportData", reportData);
            }
        } else {
            console.log("暂无当前上传事件");
        }
    }
}


