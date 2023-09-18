/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：当前热门歌曲桌面组件的中介
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import AdManager from "../../../Expand/AdManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import MusicManager, { MusicType } from "../../../Expand/MusicManager";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import HotView from "../HomeView/HotView";
import NormalMusicUnit from "../Unit/NormalMusicUnit";
import NormalMusicMediator from "./NormalMusicMediator";

export default class HotViewMediator extends Mediator {

    /** 顶部组件 */
    private curPage: HotView = null;

    // 用于存储当前组件能够进行刷新出来的歌曲列表
    private curMusicList = [];
    // 用于存储当前组件历史曾经刷新出来过的歌曲列表
    private HistoryList = [];
    // 当前组件单次能够进行存储的最大歌曲数量
    protected MusicCount = 3;
    // 创建组件的间隔事件差
    private createInterTime = 50;


    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(HotView);
        this.getCurMusicList();
        this.setBTNEvent();
    };



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
            curList = this.dealRepeatMusic(MusicType.HotUnLockMusic, curList, 1);
        }

        curList = this.dealRepeatMusic(MusicType.HotLockMusic, curList);
        curList = this.dealRepeatMusic(MusicType.HotUnPlayMusic, curList);
        curList = this.dealRepeatMusic(MusicType.HotUnPrefectMusic, curList);
        curList = this.dealRepeatMusic(MusicType.HotOtherMusic, curList);

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

                CommonFacade.getInstance().removeMediator(AllMediatorDefine.HotViewMediator + "_" + i);
                CommonFacade.getInstance().registerMediator(new NormalMusicMediator(AllMediatorDefine.HotViewMediator + "_" + i, curPrefab));
                let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.HotViewMediator + "_" + i) as NormalMusicMediator;
                curMediator.setADType(false);
                curMediator.baseMusicInfo = this.curMusicList[i];
                curMediator.refreshMusicData();
                curMediator.setSkinGroupType(1);

                setTimeout(() => {
                    curJS.setMusicAnim(true);

                    if (i == (maxSize - 1) &&
                        (CommonGlobal.getInstance().platform == Platform.OPPO || CommonGlobal.getInstance().platform == Platform.VIVO)) {
                        self.initADMusicUnit();
                    }
                }, self.createInterTime * i)
            })
        }
    };

    /** 初始化创建一个广告音乐条 */
    private initADMusicUnit() {
        this.curPage.createMusicPrefab((curPrefab: cc.Node) => {
            console.log("对应回调");
            const curJS = curPrefab.getComponent(NormalMusicUnit);
            CommonFacade.getInstance().removeMediator(AllMediatorDefine.HotViewMediator + "_AD");
            CommonFacade.getInstance().registerMediator(new NormalMusicMediator(AllMediatorDefine.HotViewMediator + "_AD", curPrefab));
            let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.HotViewMediator + "_AD") as NormalMusicMediator;
            curMediator.setADType(true);
            curMediator.updateADInfo();

            setTimeout(() => {
                curJS.setMusicAnim(true);
            }, this.createInterTime)
        })
    };




    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置监听事件 */
    private setBTNEvent() {
        this.curPage.setAllMusicEvt(() => {
            this.allMusicEvt();
        })
    };

    /** 设置查看全部歌曲的监听事件 */
    private allMusicEvt() {
        const musicFunc = () => {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowMusicScrollRequest, ({
                type: 3
            }))
        }

        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowPageRequest, ({
            showPageNum: 1,
            curCall: musicFunc
        }));

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "lookAll", 1);

        // 安卓查看全部歌曲弹插屏
        if (CommonGlobal.getInstance().platform == Platform.Android) {
            AdManager.showInsertAD();
        }
    };

}
