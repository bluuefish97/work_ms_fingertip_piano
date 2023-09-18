/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.23
功能：增加钻石界面
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import AnalyticsManager from "../../../Expand/AnalyticsManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AddDiamondPage extends cc.Component {

    /** 增加钻石的基础节点 */
    private baseNode: cc.Node = null;

    /** 视频按钮节点 */
    private videoBTN: cc.Node = null;
    /** 抖音端视频图标 */
    private douyinSP: cc.Node = null;
    /** 普通端视频图标 */
    private videoSP: cc.Node = null;

    /** 抖音端关闭当前界面按钮 */
    private cancelBTN: cc.Node = null;

    /** 玩游戏获得按钮节点 */
    private playBTN: cc.Node = null;

    /** 关闭按钮节点 */
    private closeBTN: cc.Node = null;

    /** 钻石文本节点 */
    private diamondLB: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defineCommonPar();
        this.defination();
        this.setDouyinStatus();
    };

    onEnable() {
        this.setPageAnim();
        AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "diabank", 1);
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 定义通用数据 */
    private defineCommonPar() {
        this.node.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);
        this.node.zIndex = 10;
        cc.game.addPersistRootNode(this.node);
    };

    /** 节点的定义 */
    private defination() {
        this.baseNode = this.node.getChildByName("SP_Base");
        this.baseNode.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);

        this.videoBTN = this.baseNode.getChildByName("BTN_Video");
        this.douyinSP = this.videoBTN.getChildByName("SP_Douyin");
        this.videoSP = this.videoBTN.getChildByName("SP_Video");
        this.cancelBTN = this.baseNode.getChildByName("BTN_Cancel");
        this.playBTN = this.baseNode.getChildByName("BTN_Play");
        this.closeBTN = this.baseNode.getChildByName("BTN_Close");

        this.diamondLB = this.baseNode.getChildByName("SP_DiamondLB").getChildByName("LB_Diamond");
    };

    /** 设置抖音端的样式 */
    private setDouyinStatus() {
        this.douyinSP.active = false;
        this.videoSP.active = false;
        this.cancelBTN.active = false;

        if (CommonGlobal.getInstance().platform == Platform.Douyin) {
            this.douyinSP.active = true;
            this.cancelBTN.active = true;
            this.closeBTN.active = false;

            this.cancelBTN.x = -250;
            this.videoBTN.x = 250;
        } else {
            this.videoSP.active = true;
        }
    };

    /** 设置页面的弹窗动画 */
    public setPageAnim() {
        this.baseNode.y = CommonGlobal.getInstance().screenHeight;
        cc.tween(this.baseNode)
            .to(0.5, { y: 0 }, { easing: cc.easing.cubicOut })
            .start()
    };

    /** 设置钻石文本 */
    public setDiamondLB(diamondNum: number) {
        this.diamondLB.getComponent(cc.Label).string = "+" + diamondNum.toString();
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 设置视频获得钻石的事件 */
    public setVideoEvt(curCall: Function) {
        this.videoBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置玩游戏获得的事件 */
    public setPlayEvt(curCall: Function) {
        this.playBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置关闭的监听事件 */
    public setCloseEvt(curCall: Function) {
        this.closeBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
        this.cancelBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };


}
