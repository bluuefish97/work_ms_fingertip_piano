/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：音乐列表的中介
*****************************************************/

import AnalyticsManager from "../../../Expand/AnalyticsManager";
import MusicManager, { MusicStatus } from "../../../Expand/MusicManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import MusicListPage from "../HomeView/PageList/MusicListPage";
import MusicScrollMediator from "./MusicScrollMediator";

export default class MusicListMediator extends Mediator {

    /** 音乐列表总节点 */
    private curPage: MusicListPage = null;

    /** 当前音乐列表组件的类型 */
    protected curMusicPageType: number = -1;

    /** 当前所使用的歌曲列表信息集合 */
    protected curMusicList = [];

    /** 全部歌曲的类型列表 */
    private musicStatusList = [
        MusicStatus.UnClearMusic,
        MusicStatus.ClearMusic,
        MusicStatus.CollectMusic,
        MusicStatus.AllMusic,
    ]

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(MusicListPage);
        this.showCurPage(3);
        this.setMusicContentHigh(this.curPage.scrollCon, this.curMusicList.length);

        this.setButtonEvt();
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.ShowMusicScrollResponse,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        if (info) {
            switch (notification.getName()) {
                case AllCommandDefine.ShowMusicScrollResponse:
                    this.showCurPage(info.type);
                    break;
            }
        }
    }



    // ------------------------------------------------------------
    // 内置函数

    /** 控制页面显示 */
    public setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);
    };

    /** 展示指定的页面 */
    private showCurPage(pageNum: number) {
        if (this.curMusicPageType == pageNum) return

        const self = this;
        this.curPage.showCurPage(pageNum, (curPrefab) => {
            // 获得列表信息和类型
            let curStatus = self.musicStatusList[pageNum];
            let curList = MusicManager.getInstance().getStatusMusicList(curStatus);

            // 抓取之前创建的页面预制的中介,如果不存在则进行重新创建
            let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.MusicListMediator + "_scroll_" + pageNum) as MusicScrollMediator;
            if (!curMediator) {
                CommonFacade.getInstance().registerMediator(new MusicScrollMediator(AllMediatorDefine.MusicListMediator + "_scroll_" + pageNum, curPrefab));
                curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.MusicListMediator + "_scroll_" + pageNum) as MusicScrollMediator;

                // 基础信息初始化
                curMediator.initMusicData(AllMediatorDefine.MusicListMediator, pageNum);
                // 刷新歌曲列表信息
                curMediator.initMusicList(curList);
            } else {
                curMediator.setPageActive(true);
                if (curMediator.checkListChange(curList) == true) {
                    curMediator.refreshMusicList();
                } else {
                    // 基础信息初始化
                    curMediator.initMusicData(AllMediatorDefine.MusicListMediator, pageNum);
                    // 刷新歌曲列表信息
                    curMediator.initMusicList(curList);
                }
            }

            self.curPage.refreshBTN(curStatus);
            self.curMusicPageType = pageNum;
        })

        switch (pageNum) {
            case 0:
                AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "failPassList", 1);
                break

            case 1:
                AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "passList", 1);
                break

            case 2:
                AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "collectList", 1);
                break

            case 3:
                AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "allsongList", 1);
                break
        }

    };

    /** 设置音乐组件的高度 */
    public setMusicContentHigh(parentNode: cc.Node, maxNum: number) {
        this.curPage.setContentHeight(parentNode, maxNum);
    };


    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置按钮监听事件 */
    private setButtonEvt() {
        this.curPage.setUnclearEvt(() => {
            this.unclearEvt();
        })

        this.curPage.setClearEvt(() => {
            this.clearEvt();
        })

        this.curPage.setFavourEvt(() => {
            this.favourEvt();
        })

        this.curPage.setAllEvt(() => {
            this.allEvt();
        })

    };

    /** 设置展示尚未通关歌曲的监听事件 */
    private unclearEvt() {
        if (this.curMusicPageType == 0) return

        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowMusicScrollRequest, ({
            type: 0
        }))

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "failPassList", 1);
    };

    /** 设置展示通关歌曲的监听事件 */
    private clearEvt() {
        if (this.curMusicPageType == 1) return

        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowMusicScrollRequest, ({
            type: 1
        }))

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "passList", 1);
    };

    /** 设置展示偏好歌曲的监听事件 */
    private favourEvt() {
        if (this.curMusicPageType == 2) return

        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowMusicScrollRequest, ({
            type: 2
        }))

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "collectList", 1);
    };

    /** 设置展示全部歌曲的监听事件 */
    private allEvt() {
        if (this.curMusicPageType == 3) return

        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowMusicScrollRequest, ({
            type: 3
        }))

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "allsongList", 1);
    };


}
