/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.22
功能：复活界面
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import AdManager from "../../../Expand/AdManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RelivePage extends cc.Component {

    // 倒计时组件
    /** 倒计时总控制节点 */
    private countDownCon: cc.Node = null;
    /** 倒计时的图片 */
    private countDownSP: cc.Node = null;
    /** 倒计时文本的节点 */
    private countDownLB: cc.Node = null;
    /** 扩散动画图片 */
    private diffuseSP: cc.Node = null;

    /** 钻石复活按钮节点 */
    private diamondBTN: cc.Node = null;

    /** 视频复活按钮节点 */
    private videoBTN: cc.Node = null;

    /** 普通视频图片节点 */
    private videoSP: cc.Node = null;

    /** 抖音视频图片节点 */
    private douyinSP: cc.Node = null;

    /** 放弃复活按钮节点 */
    private giveUpBTN: cc.Node = null;

    /** 放弃复活按钮节点2 */
    private giveUpBTN2: cc.Node = null;


    // 复活倒计时使用参数

    /** 表当前的倒计时尚未进行暂停 */
    private isStop: boolean = true
    /** 当前游戏复活最大的倒计时时间 */
    private maxReliveTime: number = 10
    /** 当前游戏复活所剩余的考虑时间(可被暂停) */
    private curReliveTime: number = 0
    /** 上一次倒计时动画的时间(用于存储整数) */
    private lastReliveTime: number = 0


    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        cc.game.addPersistRootNode(this.node); //添加常驻节点

        this.defination();
        this.setDouyinStatus();
    };

    onEnable() {
        AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "revive", 1);

        if (CommonGlobal.getInstance().platform == Platform.Douyin) {
            AdManager.showInsertAD();
        }
    };

    update(dt) {
        this.AddReliveTime(dt);
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        this.countDownCon = this.node.getChildByName("GRP_CountDown");
        this.countDownSP = this.countDownCon.getChildByName("SP_Base").getChildByName("SP_CountDown");
        this.countDownLB = this.countDownCon.getChildByName("SP_Base").getChildByName("LB_CountDown");
        this.diffuseSP = this.countDownCon.getChildByName("SP_Base").getChildByName("SP_Diffuse");

        this.diamondBTN = this.node.getChildByName("BTN_Diamond");
        this.videoBTN = this.node.getChildByName("BTN_Video");
        this.videoSP = this.videoBTN.getChildByName("SP_Video");
        this.douyinSP = this.videoBTN.getChildByName("SP_Douyin");
        this.giveUpBTN = this.node.getChildByName("BTN_GiveUp");
        this.giveUpBTN2 = this.node.getChildByName("BTN_GiveUp2");

        this.diamondBTN.active = false;
    };

    /** 设置复活剩余时间的倒计时文本显示 */
    private setReliveLB(reliveNum: number) {
        this.countDownLB.getComponent(cc.Label).string = reliveNum.toString();
        this.countDownSP.getComponent(cc.Sprite).fillRange = reliveNum / this.maxReliveTime;
    };

    /** 不断增加复活的时间 */
    private AddReliveTime(dt) {
        //  如果当前处于展示获得钻石或者体力界面的状态下
        if (CommonGlobal.getInstance().showDiamondPage == true) {
            this.isStop = false;
            return
        }

        if (this.isStop == false) {
            this.curReliveTime += dt;

            // 如果需要进行重新设置倒计时文本
            if (Math.floor(this.curReliveTime) > this.lastReliveTime) {
                this.lastReliveTime = Math.floor(this.curReliveTime);
                if (this.lastReliveTime == this.maxReliveTime) {
                    this.isStop = true;
                    this.setPageActive(false);

                    CommonFacade.getInstance().sendNotification(AllCommandDefine.ReliveRequest, ({
                        type: "giveup",
                        cost: 0,
                    }))

                }
                this.setReliveLB(this.maxReliveTime - this.lastReliveTime);
                this.setDiffuseAnim();

                AudioPlayManager.playReliveAU();
            }
        }
    };

    /** 设置扩散动画 */
    private setDiffuseAnim() {
        this.diffuseSP.active = true;
        this.diffuseSP.opacity = 255;
        this.diffuseSP.setScale(1);

        cc.tween(this.diffuseSP)
            .to(0.5, { opacity: 0, scale: 2 })
            .call(() => {
                this.diffuseSP.active = false;
            })
            .start()
    };

    /** 重设复活的倒计时 */
    public ResetReliveTime() {
        this.setReliveLB(this.maxReliveTime);
        this.isStop = false;
        this.curReliveTime = 0;
        this.lastReliveTime = 0;
    };

    /** 设置倒计时的状态 */
    public setCountDownStop(curBool: boolean) {
        this.isStop = curBool;
    };

    /** 设置抖音端的样式 */
    private setDouyinStatus() {
        this.giveUpBTN.active = false;
        this.giveUpBTN2.active = false;
        this.douyinSP.active = false;
        this.videoSP.active = false;

        if (CommonGlobal.getInstance().platform == Platform.Douyin) {
            this.giveUpBTN2.active = true;
            this.douyinSP.active = true;
        }else if(CommonGlobal.getInstance().platform == Platform.Wechat) {
            this.giveUpBTN2.active = true;
            this.douyinSP.active = true;
        }
        else {
            this.giveUpBTN.active = true;
            this.videoSP.active = true;
        }
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };


    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置钻石复活的监听事件 */
    public setDiamondEvt(curCall: Function) {
        this.diamondBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置视频复活的监听事件 */
    public setVideoEvt(curCall: Function) {
        this.videoBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置放弃复活的监听事件 */
    public setGiveUpEvt(curCall: Function) {
        this.giveUpBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
        this.giveUpBTN2.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}
