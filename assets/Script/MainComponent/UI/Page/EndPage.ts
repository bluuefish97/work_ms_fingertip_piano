/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.23
功能：结算界面
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import TipsManager from "../../../Common/TipsManager";
import AdManager from "../../../Expand/AdManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import SDKManager from "../../../Expand/SDKManager";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import { PageName } from "../../PageName";
import { OpenPageFunc } from "../Command/OpenPageCmd";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EndPage extends cc.Component {

    // 歌曲歌名组件
    /** 歌曲歌名组件总节点 */
    private songNameCon: cc.Node = null;
    /** 歌曲名称的文本节点 */
    private songNameLB: cc.Node = null;
    /** 歌曲的偏好按钮 */
    private favourBTN: cc.Node = null;
    /** 歌曲的偏好图片 */
    private favourSP: cc.Node = null;
    /** 歌曲的不偏好图片 */
    private unfavourSP: cc.Node = null;

    // 星星组件
    /** 星星控制总节点 */
    private starCon: cc.Node = null;
    /** 灰色星星列表 */
    private starGrayList: cc.Node[] = [];
    /** 点亮星星列表 */
    private starLightList: cc.Node[] = [];
    /** 星星动画节点列表 */
    private starAnimList: cc.Node[] = [];
    /** 星星位置总控制节点 */
    private starPosCon: cc.Node = null;
    /** 星星位置列表 */
    private starPosList: cc.Node[] = [];

    /** 当前游戏所获得的分数 */
    private curScoreLB: cc.Node = null;

    /** 当前歌曲的最佳分数 */
    private bestScoreLB: cc.Node = null;

    /** 当前游戏所获得的钻石分数 */
    private diamondLB: cc.Node = null;

    /** 底部的歌曲条 */
    private baseMusicBar: cc.Node = null;

    /** 普通按钮控制总节点 */
    private normalCon: cc.Node = null;
    /** 下一首歌曲 */
    private nextBTN: cc.Node = null;
    /** 视频解锁歌曲 */
    private videoBTN: cc.Node = null;
    /** 返回桌面按钮 */
    private homeBTN: cc.Node = null;
    /** 重新开始按钮 */
    private restartBTN: cc.Node = null;
    /** 抖音重新开始按钮 */
    private douyinRestartBTN: cc.Node = null;
    /** 抖音返回按钮 */
    private douyinBackBTN: cc.Node = null;

    /** 广告按钮控制总节点 */
    private ADCon: cc.Node = null;
    /** 广告下一首按钮 */
    private adNextBTN: cc.Node = null;
    /** 查看广告按钮 */
    private adBTN: cc.Node = null;


    /** 分数或者钻石分多少次进行增加 */
    private addCount: number = 20;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        cc.game.addPersistRootNode(this.node); //添加常驻节点

        this.defination();
        this.setDouyinStatus();
    };

    onEnable() {
        if (CommonGlobal.getInstance().platform == Platform.OPPO || CommonGlobal.getInstance().platform == Platform.Android) {
            AdManager.showNativeBanner();

            // 判断是否要展示原生贴片
            if (AdManager.getNativePasterFlag()) {
                AdManager.showNativePaster();
            }

            // 安卓结算页弹插屏
            if (CommonGlobal.getInstance().platform == Platform.Android) {
                AdManager.showInsertAD();
            }

        } else {
            AdManager.showBanner();
        }
        this.setBTNShow()

        // 抖音额外加插屏
        if (CommonGlobal.getInstance().platform == Platform.Douyin) {
            AdManager.showInsertAD();

            const curVideoCall = (videoPath) => {
                if (!videoPath) {
                    TipsManager.getInstance().showTips("视频录制出错");
                } else {
                    if (CommonGlobal.getInstance().isGameing == false) {
                        CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.RecordSharePage));
                    }
                }
            }

            SDKManager.getInstance().stopGameVideo(curVideoCall);
        }
    };

    onDisable() {
        AdManager.hideNativeBanner();
        AdManager.hideBanner();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        // 歌曲歌名组件
        this.songNameCon = this.node.getChildByName("GRP_SongName");
        this.songNameLB = this.songNameCon.getChildByName("LB_SongName");
        this.favourBTN = this.songNameCon.getChildByName("BTN_Favour");
        this.favourSP = this.favourBTN.getChildByName("SP_Favour");
        this.unfavourSP = this.favourBTN.getChildByName("SP_UnFavour");

        // 星星控制组件
        this.starCon = this.node.getChildByName("GRP_Star");
        this.starGrayList = [];
        this.starLightList = [];
        this.starAnimList = [];
        for (let i = 0; i < this.starCon.childrenCount; i++) {
            this.starGrayList[i] = this.starCon.children[i].getChildByName("SP_Gray");
            this.starLightList[i] = this.starCon.children[i].getChildByName("SP_Light");
            this.starAnimList[i] = this.starCon.children[i].getChildByName("SP_Anim");
        }

        // 星星位置控制总节点
        this.starPosCon = this.node.getChildByName("StarPosList");
        this.starPosList = [];
        for (let j = 0; j < this.starPosCon.childrenCount; j++) {
            this.starPosList[j] = this.starPosCon.children[j];
        }

        // 分数组件
        this.curScoreLB = this.node.getChildByName("LB_CurScore");
        this.bestScoreLB = this.node.getChildByName("LB_BestScore");
        this.diamondLB = this.node.getChildByName("GRP_Diamond").getChildByName("LB_Diamond");

        // 歌曲条
        this.baseMusicBar = this.node.getChildByName("NormalMusicBar");

        // 返回主界面按钮
        this.homeBTN = this.node.getChildByName("BTN_Home");

        // 普通按钮
        this.normalCon = this.node.getChildByName("GRP_Normal");
        this.videoBTN = this.normalCon.getChildByName("BTN_Video");
        this.nextBTN = this.normalCon.getChildByName("BTN_Next");
        this.restartBTN = this.normalCon.getChildByName("BTN_Restart");
        this.douyinRestartBTN = this.normalCon.getChildByName("BTN_Douyin_Restart");
        this.douyinBackBTN = this.normalCon.getChildByName("BTN_Douyin_Back");

        this.ADCon = this.node.getChildByName("GRP_AD");
        this.adNextBTN = this.ADCon.getChildByName("BTN_Next");
        this.adBTN = this.ADCon.getChildByName("BTN_AD");

    };

    /** 重新设置结算界面 */
    public resetEndPage() {
        // 重新设置星星
        for (let i = 0; i < this.starCon.childrenCount; i++) {
            this.starGrayList[i].active = true;
            this.starLightList[i].active = false;
            this.starLightList[i].stopAllActions();
            this.starAnimList[i].active = false;
            this.starAnimList[i].stopAllActions();
        }

        this.setSongNameLB("");
        this.setCurScoreLB(0);
        this.setBestScoreLB(0);
        this.setDiamondLB(0);
    };

    /** 设置抖音端的样式 */
    private setDouyinStatus() {
        this.homeBTN.active = false;
        this.restartBTN.active = false;
        this.douyinRestartBTN.active = false;
        this.douyinBackBTN.active = false;

        if (CommonGlobal.getInstance().platform == Platform.Douyin || CommonGlobal.getInstance().platform == Platform.Web) {
            this.douyinRestartBTN.active = true;
            this.douyinBackBTN.active = true;

            this.nextBTN.setPosition(cc.v2(240, this.nextBTN.position.y));
            this.videoBTN.setPosition(cc.v2(240, this.videoBTN.position.y));
        } else {
            this.homeBTN.active = true;
            this.restartBTN.active = true;
        }
    };



    // ------------------------------------
    // 星星动画

    /** 设置星星获得动画 */
    public setStarAnim(curStarNum: number) {
        // curStarNum = 3;
        for (let i = 0; i < curStarNum; i++) {
            // this.scheduleOnce(() => {
            //     this.showStarAnim(i);
            // }, 0.3 * i)

            setTimeout(() => {
                this.showStarAnim(i);
            }, 300 * i);
        }
    };

    /** 展示星星获得动画 */
    public showStarAnim(curNum: number) {
        // 获得对应的星星动画预制
        let curAnim = this.starLightList[curNum];

        // 获得指定的位置
        let homeStarPos = this.starLightList[curNum].position;

        // 数据初始化
        curAnim.scale = 0;
        curAnim.opacity = 0;
        curAnim.active = true;
        let firstWorldPos = this.starPosList[curNum].position;
        curAnim.setPosition(cc.v2(firstWorldPos.x, firstWorldPos.y));

        cc.tween(curAnim)
            .to(0.6, { scale: 5, opacity: 255 })
            .to(0.15, { scale: 0.9, x: homeStarPos.x, y: homeStarPos.y })
            .to(0.1, { scale: 1 })
            .call(() => {
                this.showStarDiffuseAnim(curNum);
            })
            .start()

        AudioPlayManager.playEndStarAU();
    };

    /** 展示星星扩散动画 */
    private showStarDiffuseAnim(curNum: number) {
        const curDiffuseNode = this.starAnimList[curNum];
        curDiffuseNode.active = true;
        curDiffuseNode.scale = 1;
        curDiffuseNode.opacity = 255;

        cc.tween(curDiffuseNode)
            .to(0.5, { scale: 1.4, opacity: 0 })
            .call(() => {
                curDiffuseNode.active = false;
            })
            .start();
    };



    // ------------------------------------
    // 文本设置

    /** 设置当前歌曲名称 */
    public setSongNameLB(songNameStr: string) {
        this.songNameLB.getComponent(cc.Label).string = songNameStr;
    };

    /** 设置当前游戏所获得分数的动画 */
    public setCurScoreAnim(curNum: number) {
        let scoreNum = 0;
        // 累增动画
        for (let j = 0; j < this.addCount; j++) {
            const curTime = j * 0.02
            this.scheduleOnce(() => {
                scoreNum += Math.floor(curNum / this.addCount);
                this.curScoreLB.getComponent(cc.Label).string = scoreNum.toString();
            }, curTime)
        }

        this.scheduleOnce(() => {
            this.curScoreLB.getComponent(cc.Label).string = curNum.toString();
        }, this.addCount * 0.02)
    };

    /** 设置当前游戏所获得的分数 */
    public setCurScoreLB(curNum: number) {
        this.curScoreLB.getComponent(cc.Label).string = curNum.toString();
    };

    /** 设置当前歌曲所获得的最佳分数 */
    public setBestScoreLB(curNum: number) {
        this.bestScoreLB.getComponent(cc.Label).string = "最佳: " + curNum.toString();
    };

    /** 设置所获得钻石数的动画 */
    public setDiamondAnim(curNum: number) {
        let diamondNum = 0;
        // 累增动画
        for (let j = 0; j < this.addCount; j++) {
            const curTime = j * 0.02
            this.scheduleOnce(() => {
                diamondNum += Math.floor(curNum / this.addCount);
                this.diamondLB.getComponent(cc.Label).string = " +" + diamondNum.toString();
            }, curTime)
        }

        this.scheduleOnce(() => {
            this.diamondLB.getComponent(cc.Label).string = " +" + curNum.toString();
        }, this.addCount * 0.02)
    };

    /** 设置所获得的钻石数 */
    public setDiamondLB(curNum: number) {
        this.diamondLB.getComponent(cc.Label).string = "+" + curNum.toString();
    };


    // ------------------------------------
    // 刷新底部按钮显示(底部开始游戏按钮)

    /** 刷新底部按钮的样式 */
    public refreshDownBTN(isLock: boolean) {
        this.nextBTN.active = !isLock;
        this.videoBTN.active = isLock;
    };


    // ------------------------------------
    // 其他

    /** 设置偏好按钮的样式 */
    public setFavourBTN(isFavour: boolean) {
        this.favourSP.active = isFavour;
        this.unfavourSP.active = !isFavour;
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };

    /** 设置按钮的展示 */
    public setBTNShow() {
        this.normalCon.active = false;
        this.ADCon.active = false;

        if ((CommonGlobal.getInstance().platform == Platform.OPPO || CommonGlobal.getInstance().platform == Platform.VIVO)
            && AdManager.isShowNativeAD()) {
            this.ADCon.active = true;
        } else {
            this.normalCon.active = true;
        }
    };

    /** 获得歌曲条节点 */
    public getMusicUnit() {
        return this.baseMusicBar
    };

    /** 获得下一首歌曲按钮 */
    public getNextBTN() {
        if (CommonGlobal.getInstance().platform == Platform.Douyin || CommonGlobal.getInstance().platform == Platform.Web) {
            return this.adNextBTN
        } else {
            return this.nextBTN
        }
    };

    /** 获得重新开始游戏按钮 */
    public getRestartBTN() {
        if (CommonGlobal.getInstance().platform == Platform.Douyin || CommonGlobal.getInstance().platform == Platform.Web) {
            return this.douyinRestartBTN
        } else {
            return this.restartBTN
        }
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 设置偏好按钮的监听事件 */
    public setFavourEvt(curCall: Function) {
        this.favourBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置视频解锁歌曲按钮的监听事件 */
    public setVideoEvt(curCall: Function) {
        this.videoBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置返回主界面按钮的监听事件 */
    public setHomeEvt(curCall: Function) {
        this.homeBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
        this.douyinBackBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置重新开始游戏按钮的监听事件 */
    public setRestartEvt(curCall: Function) {
        this.restartBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
        this.douyinRestartBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 强制设置结算歌曲为下一首 */
    public setNextEvt(curCall: Function) {
        this.nextBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
        this.adNextBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置查看广告按钮的监听事件 */
    public setADEvt(curCall: Function) {
        this.adBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}
