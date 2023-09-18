/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：猜你喜好桌面组件的中介
*****************************************************/

import AnalyticsManager from "../../../Expand/AnalyticsManager";
import MusicManager, { MusicType } from "../../../Expand/MusicManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import LikeView from "../HomeView/LikeView";
import NormalMusicUnit from "../Unit/NormalMusicUnit";
import NormalMusicMediator from "./NormalMusicMediator";

export default class LikeViewMediator extends Mediator {

    /** 顶部组件 */
    private curPage: LikeView = null;

    // 用于存储当前组件能够进行刷新出来的歌曲列表
    private curMusicList = [];
    // 用于存储当前组件历史曾经刷新出来过的歌曲列表
    private HistoryList = [];
    // 当前组件单次能够进行存储的最大歌曲数量
    protected MusicCount = 3;
    // 创建组件的间隔事件差
    private createInterTime = 50;
    // 表当前组件处于切换音乐动画的状态中
    private ChangeMusicAnim = false

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(LikeView);
        this.getCurMusicList();
        this.setBTNEvent();
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.LikeViewResponse
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        let infoType = info.curType
        switch (notification.getName()) {
            case AllCommandDefine.LikeViewResponse:
                this.refreshMusicList(info.unlock);
                break;
            default:
                break;
        }
    }

    

    // ------------------------------------------------------------
    // 内部函数

    /** 获得当前歌曲列表 */
    private getCurMusicList() {
        this.curMusicList = this.dealCurShowMusicList(null, true);
        this.initCreateMusicList(this.curMusicList.length);
    };

    /** 处理当前组件所要进行展示的歌曲列表 */
    private dealCurShowMusicList(lastList = null, needUnlock = false) {
        let curList = [];
        let hasLast = false;

        if (lastList) {
            for (let i = 0; i < lastList.length; i++) {
                curList.push(lastList[i]);
            }

            hasLast = true;
        }

        if (curList.length == 0 && needUnlock == true) {
            curList = this.dealRepeatMusic(MusicType.BannerUnLockMusic, curList, 1);
        }

        curList = this.dealRepeatMusic(MusicType.BannerLockMusic, curList);
        curList = this.dealRepeatMusic(MusicType.BannerUnPlayMusic, curList);
        curList = this.dealRepeatMusic(MusicType.BannerUnPrefectMusic, curList);
        curList = this.dealRepeatMusic(MusicType.BannerOtherMusic, curList);

        /** 如果当前的歌曲列表长度还是不符合预期,则说明当前的已经进过了一个循环,从而需要进行将原先的历史歌曲进行全部清除,并将其进行重新遍历 */
        if (curList.length < this.MusicCount && hasLast == false) {
            this.HistoryList.splice(0, this.HistoryList.length);
            curList = this.dealCurShowMusicList(curList);
        }

        return curList;
    };

    /** 根据对应的类型类型进行处理重复的歌曲列表 */
    private dealRepeatMusic(curType: MusicType, lastList, addMaxNum = 5) {
        let musicNum = lastList.length;
        if (musicNum >= this.MusicCount) return lastList

        let homeMusicTable = MusicManager.getInstance().HomeMusicTable;
        let curList = MusicManager.getInstance().getLimitMusicList(curType);
        for (let i = 0; i < curList.length; i++) {
            const curData = curList[i];
            const curMusicId = curData.MusicId;
            if (this.HistoryList.indexOf(curMusicId) == -1
                && homeMusicTable.indexOf(curData) == -1) {
                this.HistoryList.push(curMusicId);
                MusicManager.getInstance().HomeMusicTable.push(curData)
                lastList.push(curData);
                musicNum++;

                if (musicNum >= this.MusicCount || musicNum >= addMaxNum) {
                    break;
                }
            }
        }

        return lastList;
    };

    /** 初始化创建音乐列表 */
    private initCreateMusicList(maxSize) {
        const self = this;
        for (let i = 0; i < maxSize; i++) {
            this.curPage.createMusicPrefab((curPrefab: cc.Node) => {
                console.log("对应回调");
                const curJS = curPrefab.getComponent(NormalMusicUnit);

                CommonFacade.getInstance().removeMediator(AllMediatorDefine.LikeViewMediator + "_" + i);
                CommonFacade.getInstance().registerMediator(new NormalMusicMediator(AllMediatorDefine.LikeViewMediator + "_" + i, curPrefab));
                let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.LikeViewMediator + "_" + i) as NormalMusicMediator;
                curMediator.setADType(false);
                curMediator.baseMusicInfo = this.curMusicList[i];
                curMediator.refreshMusicData();
                curMediator.setSkinGroupType(2);

                setTimeout(() => {
                    curJS.setMusicAnim(true);
                }, self.createInterTime * i)
            })
        }
    };

    /** 对当前当前的音乐列表进行刷新 */
    private refreshMusicList(needUnlock = false) {
        // 移除桌面歌单
        for (let j = MusicManager.getInstance().HomeMusicTable.length - 1; j >= 0; j--) {
            const curData = MusicManager.getInstance().HomeMusicTable[j];
            for (let z = 0; z < this.curMusicList.length; z++) {
                const musicData = this.curMusicList[z];

                if (curData == musicData) {
                    MusicManager.getInstance().HomeMusicTable.splice(j, 1);
                }
            }
        }

        this.curMusicList = this.dealCurShowMusicList(null, needUnlock);
        for (let i = 0; i < this.curPage.musicContentNode.childrenCount; i++) {
            const curChild = this.curPage.musicContentNode.children[i];
            const curJS = curChild.getComponent(NormalMusicUnit);
            let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.LikeViewMediator + "_" + i) as NormalMusicMediator;
            curMediator.setADType(false);
            curMediator.baseMusicInfo = this.curMusicList[i];

            setTimeout(() => {
                const moveInAnim = () => {
                    curMediator.refreshMusicData();
                    curJS.setMusicAnim(true);
                }
                curJS.setMusicAnim(false, moveInAnim);
            }, this.createInterTime * i)
        }

        setTimeout(() => {
            this.ChangeMusicAnim = false;
        }, 700)
    };



    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置监听事件 */
    setBTNEvent() {
        this.curPage.setSwitchEvt(() => {
            this.switchEvt();
        })
    };

    switchEvt() {
        // 按钮增加延迟
        if (this.ChangeMusicAnim) {
            return;
        }
        this.ChangeMusicAnim = true;

        CommonFacade.getInstance().sendNotification(AllCommandDefine.LikeViewRequest, ({
            needUnLock: false,
        }))

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "change", 1);
    };

}
