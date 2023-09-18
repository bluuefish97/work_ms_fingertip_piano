/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.26
功能：游戏内场景UI总控制的中介
*****************************************************/

import { GameState } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import audioEngineMamager from "../../../Expand/audioEngineMamager";
import MusicManager, { MusicType } from "../../../Expand/MusicManager";
import SDKManager from "../../../Expand/SDKManager";
import ToolsManager from "../../../Expand/ToolsManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import GameUI from "../Base/GameUI";

export default class GameUIMediator extends Mediator {

    /** 游戏内UI总控制界面 */
    private curPage: GameUI = null;

    /** 获得最佳分数所需要的分数和节点比例 */
    private bestScoreRate: number = 1.8;

    /** 当前的星星数 */
    private starNum: number = 0;

    /** 之前的星星数 */
    private lastStarNum: number = 0;

    /** 复活之后最大无敌的时间 */
    private maxReliveTime: number = 2;

    /** 当前复活之后无敌的时间 */
    private curReliveTime: number = 0;

    /** 增加复活时间的函数 */
    private addReliveTimeFunc = null;

    /** 获得星星时占最佳分数的百分比 */
    private starRateList = [
        35,                     // 3星
        65,                     // 2星
        100,                    // 1星
    ];

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(GameUI);
        this.resetUI();
        this.setButtonEvt();
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.GameAddScoreResponse,
            AllCommandDefine.GameReduceHPResponse,
            AllCommandDefine.GameReliveResponse,
            AllCommandDefine.GameRestartResponse,
            AllCommandDefine.GameStartResponse,
            AllCommandDefine.GameHighResponse,
            AllCommandDefine.GameChangeBGResponse
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        let name = notification.getName();
        switch (name) {
            case AllCommandDefine.GameAddScoreResponse:
                this.addScore(info.type, info.rate);
                break

            case AllCommandDefine.GameReduceHPResponse:
                this.reduceHP(info.type);
                break

            case AllCommandDefine.GameReliveResponse:
                this.gameRelive();
                break

            case AllCommandDefine.GameRestartResponse:
                this.resetUI();
                break

            case AllCommandDefine.GameStartResponse:
                this.hideMusicConAnim();
                break

            default:
                break;
        }
    };



    // ------------------------------------------------------------
    // 内置函数

    /** 刷新当前的UI */
    protected resetUI() {
        this.starNum = 0;
        this.lastStarNum = 0;

        CommonGlobal.getInstance().gameCurHP = CommonGlobal.getInstance().gameMaxHP;
        CommonGlobal.getInstance().gameScoreNum = 0;
        CommonGlobal.getInstance().gameStarNum = 0;

        this.curPage.resetUI();
        this.resetMusicData();
    };

    /** 增加分数 */
    private addScore(listNum: number, rateNum: number) {
        // 分数
        CommonGlobal.getInstance().gameScoreNum += CommonGlobal.getInstance().gameScoreList[listNum] * rateNum;
        this.curPage.refreshScoreLB();
        this.curPage.showScoreAnim(listNum);

        // 获得进度
        let per = CommonGlobal.getInstance().gameScoreNum / (this.bestScoreRate * CommonGlobal.getInstance().gameMusicJson.length);
        if (per >= 1) per = 1;
        else if (isNaN(per)) per = 0;
        this.curPage.refreshProgressBar(per);

        /** 星星的百分百 */
        let starPer = 100 * per;
        for (let j = 0; j < this.starRateList.length; j++) {
            if (starPer >= this.starRateList[j]) {
                this.starNum = j + 1;
            }
        }

        // 星星动画
        if (this.starNum > this.lastStarNum) {
            this.curPage.showStarAnim(this.lastStarNum);
            this.lastStarNum = this.starNum;
            CommonGlobal.getInstance().gameStarNum = this.starNum;
        }

    };

    /** 游戏复活 */
    private gameRelive() {
        CommonGlobal.getInstance().gameCurHP = CommonGlobal.getInstance().gameMaxHP;
        this.curPage.resetHP();
    };

    /** 体力减少 */
    private reduceHP(curType: number) {
        // 如果处于正常的游戏时间时,则进入保护时间并掉一点血
        if (CommonGlobal.getInstance().gameCurStatus == GameState.Game) {
            if (CommonGlobal.getInstance().gameCurHP > 1) {
                CommonGlobal.getInstance().gameCurStatus = GameState.Shield;

                // 设置无敌时间的监听事件
                this.addReliveTimeFunc = setInterval(() => {
                    this.curReliveTime += 0.01
                    if (this.curReliveTime >= this.maxReliveTime) {
                        this.curReliveTime = 0;
                        CommonGlobal.getInstance().gameCurStatus = GameState.Game;
                        clearInterval(this.addReliveTimeFunc);

                        this.sendNotification(AllCommandDefine.GameShieldResponse, ({
                            type: false
                        }))
                    }
                }, 10)

                SDKManager.getInstance().phoneVibrate("short");

                this.sendNotification(AllCommandDefine.GameShieldResponse, ({
                    type: true
                }))
            }
        } else {
            return
        }

        CommonGlobal.getInstance().gameCurHP--
        this.curPage.reduceHP(CommonGlobal.getInstance().gameCurHP);

        if (curType == 0) {
            this.curPage.showScoreAnim(3);
        } else if (curType == 1) {
            this.curPage.showScoreAnim(2);
        }

        if (CommonGlobal.getInstance().gameCurHP <= 0) {
            this.sendNotification(AllCommandDefine.GameShowReliveResponse);
        }
    };

    /** 重新设置歌曲信息 */
    private resetMusicData() {
        this.setMusicConActive(true);
        this.curPage.setMusicDataType();

        let musicInfo = MusicManager.getInstance().getNeedMusicData(CommonGlobal.getInstance().gameMusicId);
        this.curPage.setMusicName(musicInfo.MusicName);
        this.curPage.setSingerName(musicInfo.SingerName);
        this.curPage.setBestScore(musicInfo.ScoreNum);
        this.curPage.setStarNum(musicInfo.StarNum);
    };

    /** 设置音乐组件的显示 */
    private setMusicConActive(isShow: boolean) {
        this.curPage.setMusicConActive(isShow);
    };

    /** 调用音乐组件的隐藏动画 */
    private hideMusicConAnim() {
        this.curPage.hideMusicConAnim();
    };


    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置按钮监听事件 */
    private setButtonEvt() {
        this.curPage.setNextEvt(() => {
            this.nextEvt();
        })

        this.curPage.setPauseEvt(() => {
            this.pauseEvt();
        })

        this.curPage.setResumeEvt(() => {
            this.resumeEvt();
        })

    };

    /** 刷新歌曲列表 */
    private nextEvt() {
        let curType = MusicType.LockMusic;
        let curLockList = MusicManager.getInstance().getLimitMusicList(curType);
        if (curLockList.length == 0) {
            curType = MusicType.UnPlayMusic;
            curLockList = MusicManager.getInstance().getLimitMusicList(curType);
        }
        if (curLockList.length == 0) {
            curType = MusicType.UnPrefectMusic;
            curLockList = MusicManager.getInstance().getLimitMusicList(curType);
        }
        if (curLockList.length == 0) {
            curType = MusicType.OtherMusic;
            curLockList = MusicManager.getInstance().getLimitMusicList(curType);
        }

        let curList = curLockList[0];
        MusicManager.getInstance().removeMusicInList(curType, curList.MusicId);

        CommonGlobal.getInstance().gameCurStatus = GameState.End;

        // 自动游玩当前歌曲
        this.sendNotification(AllCommandDefine.StartGameRequest, ({
            musicinfo: curList,
            skinType: 0
        }))
    };

    private pauseEvt() {
        CommonGlobal.getInstance().gameCurStatus = GameState.Pause;
        this.curPage.setIsPause(false);
    };

    private resumeEvt() {
        CommonGlobal.getInstance().gameCurStatus = GameState.Game;
        this.curPage.setIsPause(true);
    };

}
