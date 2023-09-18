/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.23
功能：结算界面的中介
*****************************************************/

import { GameState, MusicInfo, Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import AdManager from "../../../Expand/AdManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import DiamondManager from "../../../Expand/DiamondManager";
import LocalStorageManager from "../../../Expand/LocalStorageManager";
import MusicManager from "../../../Expand/MusicManager";
import PowerManager from "../../../Expand/PowerManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import Game from "../../../SceneScript/Game";
import Home from "../../../SceneScript/Home";
import { AllCommandDefine } from "../../AllCommandDefine";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import { PageName } from "../../PageName";
import { OpenPageFunc } from "../Command/OpenPageCmd";
import EndPage from "../Page/EndPage";
import NormalMusicMediator from "./NormalMusicMediator";

export default class EndPageMediator extends Mediator {

    /** 复活界面 */
    private curPage: EndPage = null;

    /** 上一首音乐的数据 */
    private lastMusicInfo: MusicInfo = null;

    /** 基础音乐的数据 */
    private baseMusicInfo: MusicInfo = null;

    // 底部的音乐组件的节点
    private musicBar: cc.Node = null;

    /** 当前的页面是否为胜利 */
    private isWin: boolean = false;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(EndPage);
        this.setButtonEvt();
        this.setPageActive(true);
        this.checkNewRole();

        this.musicBar = this.curPage.getMusicUnit();
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.FavourMusicResponse,
            AllCommandDefine.StartGameResponse,
            AllCommandDefine.UnlockMusicResponse,
            AllCommandDefine.RefreshMusicResponse,
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        let name = notification.getName();
        switch (name) {
            case AllCommandDefine.FavourMusicResponse:
                this.favourMusic(info.musicinfo);
                break

            case AllCommandDefine.StartGameResponse:
                this.setPageActive(false);
                break

            case AllCommandDefine.UnlockMusicResponse:
                this.unlockMusic(info.musicinfo);
                break

            case AllCommandDefine.RefreshMusicResponse:
                this.refreshDownBTN();
                break

            default:
                break;
        }
    };



    // ------------------------------------------------------------
    // 内置函数

    /** 设置结算页的类型 */
    public setEndPageType(isWin: boolean) {
        this.isWin = isWin;
        this.refreshCurPage();

        switch (this.isWin) {
            case true:
                AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "fail", 1);
                break

            case false:
                AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "pass", 1);
                break
        }
    };

    /** 刷新当前的页面数据 */
    private refreshCurPage() {
        /** 页面数据进行重新设置 */
        this.curPage.resetEndPage();

        /** 刷新底部歌曲数据歌曲数据 */
        this.resetMusicInfo();

        /** 计算获得的钻石数 */
        CommonGlobal.getInstance().gameRewardDiamondNum = Math.floor(CommonGlobal.getInstance().gameScoreNum * 0.4);
        if (CommonGlobal.getInstance().gameRewardDiamondNum >= 50) CommonGlobal.getInstance().gameRewardDiamondNum = 50;

        /** 获得当前游玩歌曲的数据信息 */
        this.lastMusicInfo = MusicManager.getInstance().getNeedMusicData(CommonGlobal.getInstance().gameMusicId);
        // 歌曲通关的情况下,则将当前歌曲的信息进行设置
        if (CommonGlobal.getInstance().gameCurStatus == GameState.Clear) {
            this.lastMusicInfo.IsFinish = true;
        }
        // 数据存储
        this.saveData();
        this.setSongNameLB(this.lastMusicInfo.MusicName);
        this.setBestScoreLB(this.lastMusicInfo.ScoreNum);
        this.setFavourBTN(this.lastMusicInfo.IsLike);

        // 刷新当前歌曲的信息
        CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshMusicRequest, ({
            musicinfo: this.lastMusicInfo
        }))

        const showDataFunc = () => {
            if (this.curPage.node.active == false) return
            // 结算分数显示
            this.setCurScoreLB(CommonGlobal.getInstance().gameScoreNum);
            this.setStarAnim(CommonGlobal.getInstance().gameStarNum);
            this.setDiamondLB(CommonGlobal.getInstance().gameRewardDiamondNum);

            CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshDiamondResponse, ({
                type: CommonGlobal.getInstance().gameRewardDiamondNum
            }));

            // 自动播放结算页面的歌曲
            CommonFacade.getInstance().sendNotification(AllCommandDefine.PlayMusicRequest, ({
                musicinfo: this.baseMusicInfo,
                needSetTime: true
            }))

            CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshGiftResponse);
        }

        showDataFunc();

        if (CommonGlobal.getInstance().platform == Platform.VIVO) {
            if (this.isWin != true) {
                AdManager.showNativeBanner();
                this.curPage.setBTNShow();
            } else {
                setTimeout(() => {
                    AdManager.showInsertAD();
                }, 1000);
            }
        }

    };

    /** 设置偏好 */
    private favourMusic(curInfo: MusicInfo) {
        const curId = curInfo.MusicId;
        const curLike = curInfo.IsLike;

        if (curId == this.lastMusicInfo.MusicId) {
            this.setFavourBTN(curLike);
        }
    };

    /** 重新设置歌曲的信息 */
    private resetMusicInfo() {
        let musicData = MusicManager.getInstance().getRecommendMusic(true);
        MusicManager.getInstance().addInRecommendList(musicData);
        this.setBaseMusicInfo(musicData);
    };

    /** 设置基础音乐的歌曲数据 */
    private setBaseMusicInfo(curInfo: MusicInfo) {
        this.baseMusicInfo = curInfo;
        this.refreshMusicInfo();
    };

    /** 刷新当前底部的音乐数据 */
    private refreshMusicInfo() {
        let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.EndPageMediator + "_DownMusic") as NormalMusicMediator;
        if (curMediator) {
            curMediator.baseMusicInfo = this.baseMusicInfo;
            curMediator.refreshMusicData();
            curMediator.setAdTypeNum(2);
        } else {
            CommonFacade.getInstance().registerMediator(new NormalMusicMediator(AllMediatorDefine.EndPageMediator + "_DownMusic", this.musicBar));
            curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.EndPageMediator + "_DownMusic") as NormalMusicMediator;
            curMediator.baseMusicInfo = this.baseMusicInfo;
            curMediator.refreshMusicData();
            curMediator.setAdTypeNum(2);
        }

        this.refreshDownBTN();
    };

    /** 存储当前关卡的分数信息 */
    private saveData() {
        // 分数存储
        if (this.lastMusicInfo.ScoreNum < CommonGlobal.getInstance().gameScoreNum) {
            this.lastMusicInfo.ScoreNum = CommonGlobal.getInstance().gameScoreNum;
        }

        // 星星数存储
        if (this.lastMusicInfo.StarNum < CommonGlobal.getInstance().gameStarNum) {
            this.lastMusicInfo.StarNum = CommonGlobal.getInstance().gameStarNum;
        }

        // 钻石获得
        DiamondManager.getInstance().addDiamond(CommonGlobal.getInstance().gameRewardDiamondNum);

        // 数据进行存储
        MusicManager.getInstance().saveMusicData(this.lastMusicInfo);
    };

    /** 解锁歌曲 */
    private unlockMusic(curInfo: MusicInfo) {
        const curId = curInfo.MusicId;
        if (this.baseMusicInfo) {
            if (curId == this.baseMusicInfo.MusicId) {
                this.baseMusicInfo.IsUnlock = curInfo.IsUnlock;
                this.refreshDownBTN();
            }
        }
    };

    /** 刷新底部按钮的样式 */
    private refreshDownBTN() {
        this.curPage.refreshDownBTN(!this.baseMusicInfo.IsUnlock);
    };



    // ------------------------------------
    // 文本设置

    /** 设置当前歌曲名称 */
    private setSongNameLB(songNameStr: string) {
        this.curPage.setSongNameLB(songNameStr);
    };

    /** 设置当前游戏所获得的分数 */
    private setCurScoreLB(curNum: number) {
        this.curPage.setCurScoreAnim(curNum);
    };

    /** 设置当前歌曲所获得的最佳分数 */
    private setBestScoreLB(curNum: number) {
        this.curPage.setBestScoreLB(curNum);
    };

    /** 设置所获得的钻石数 */
    private setDiamondLB(curNum: number) {
        this.curPage.setDiamondAnim(curNum);
    };



    // ------------------------------------
    // 其他

    /** 检测当前玩家是否为新玩家 */
    private checkNewRole() {
        if (CommonGlobal.getInstance().isNewRolePlaying == true) {
            CommonGlobal.getInstance().isNewRolePlaying = false;
            LocalStorageManager.setlocalStorage("isPlayGame", true);
        }
    };

    /** 设置偏好按钮的样式 */
    private setFavourBTN(isFavour: boolean) {
        this.curPage.setFavourBTN(isFavour);
    };

    /** 设置星星数的动画 */
    private setStarAnim(curNum: number) {
        this.curPage.setStarAnim(curNum);

        if (this.lastMusicInfo.StarNum < curNum) {
            this.lastMusicInfo.StarNum = curNum;
            MusicManager.getInstance().saveMusicData(this.lastMusicInfo);
        }
    };

    /** 设置界面的显示 */
    public setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);

        CommonFacade.getInstance().sendNotification(AllCommandDefine.SetDiamondActiveRequest, ({
            type: isShow
        }))

        CommonFacade.getInstance().sendNotification(AllCommandDefine.SetPowerActiveRequest, ({
            type: isShow
        }))

        CommonGlobal.getInstance().isGameing = !isShow;
    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置按钮监听事件 */
    private setButtonEvt() {
        this.curPage.setFavourEvt(() => {
            this.setFavourEvt();
        })

        this.curPage.setVideoEvt(() => {
            this.videoEvt();
        })

        this.curPage.setHomeEvt(() => {
            this.homeEvt();
        })

        this.curPage.setRestartEvt(() => {
            this.restartEvt();
        })

        this.curPage.setNextEvt(() => {
            this.nextEvt();
        })

        this.curPage.setADEvt(() => {
            this.ADEvt();
        })
    };

    /** 设置偏好按钮的监听事件 */
    private setFavourEvt() {
        this.lastMusicInfo.IsLike = !this.lastMusicInfo.IsLike;

        CommonFacade.getInstance().sendNotification(AllCommandDefine.FavourMusicRequest, ({
            musicinfo: this.lastMusicInfo
        }))
    };

    /** 设置强制视频解锁歌曲按钮的监听事件 */
    private videoEvt() {
        const self = this;
        CommonFacade.getInstance().sendNotification(AllCommandDefine.UnlockMusicRequest, ({
            musicinfo: self.baseMusicInfo,
            type: 1,
            skinType: 0,
            startNode: self.curPage.getNextBTN()
        }))

        AnalyticsManager.getInstance().reportAnalytics("adBtnClick_eventAnalytics", "settleNewSong", 1);
    };

    /** 设置返回主界面按钮的监听事件 */
    private homeEvt() {
        this.setPageActive(false);
        if (Home.getInstance()) {
            Home.getInstance().setPageActive(true);
        } else {
            this.sendNotification(AllCommandDefine.LoadHomeRequest);
        }

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "back", 1);
    };

    /** 重新开始游戏按钮的监听事件 */
    private restartEvt() {
        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "again", 1);

        const restartEvt = () => {
            this.setPageActive(false);
            if (Game.getInstance()) {
                Game.getInstance().setPageActive(true);
            }
        }

        // 减少体力开始游戏的回调
        const reduceFunc = () => {
            PowerManager.getInstance().reducePower(CommonGlobal.getInstance().reducePoweNum, restartEvt);
        }

        // 设置减少体力的动画
        const reduceAnimFunc = () => {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.ReducePowerResponse, ({
                curNode: this.curPage.getRestartBTN(),
                curCall: reduceFunc
            }))
        }

        // 设置自动减少体力的回调
        const reducePowerFunc = () => {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(
                PageName.AddPowerPage,
                reduceAnimFunc
            ))

            AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "powerbank_noPower", 1);
        }

        if (CommonGlobal.getInstance().platform == Platform.Douyin || CommonGlobal.getInstance().platform == Platform.Web) {
            if (CommonGlobal.getInstance().userData.PowerNum >= CommonGlobal.getInstance().reducePoweNum) {
                reduceAnimFunc()
            } else {
                reducePowerFunc()
            }
        } else {
            restartEvt()
        }

    };

    /** 强制设置结算歌曲为下一首 */
    private nextEvt() {
        const self = this;
        CommonFacade.getInstance().sendNotification(AllCommandDefine.StartGameRequest, ({
            musicinfo: self.baseMusicInfo,
            skinType: 0,
            startNode: self.curPage.getNextBTN()
        }))
    };

    /** 设置查看广告按钮的监听事件 */
    private ADEvt() {
        AdManager.clickNativeAD();
    };

}

