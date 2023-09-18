/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.07
功能：增加体力界面
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import AnalyticsManager from "../../../Expand/AnalyticsManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AddPowerPage extends cc.Component {

    /** 增加体力的基础节点 */
    private baseNode: cc.Node = null;

    /** 商店图片的节点 */
    private storeNode: cc.Node = null;

    /** 钻石按钮的节点1 */
    private diamondBTN1: cc.Node = null;
    /** 钻石文本的节点1 */
    private diamondLB1: cc.Node = null;

    /** 钻石按钮的节点2 */
    private diamondBTN2: cc.Node = null;
    /** 钻石文本的节点2 */
    private diamondLB2: cc.Node = null;

    /** 视频按钮的节点 */
    private videoBTN: cc.Node = null;
    /** 普通视频图标节点 */
    private videoSP: cc.Node = null;
    /** 抖音端视频图标节点 */
    private douyinSP: cc.Node = null;

    /** 关闭按钮的节点 */
    private closeBTN: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defineCommonPar();
        this.defination();
        this.setDouyinStatus();
    };

    onEnable(){
        AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "powerbank", 1);
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 定义通用数据 */
    private defineCommonPar() {
        this.node.zIndex = 10;
        cc.game.addPersistRootNode(this.node);
    };

    /** 节点的定义 */
    private defination() {
        this.baseNode = this.node.getChildByName("SP_Base");
        this.baseNode.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);

        this.storeNode = this.baseNode.getChildByName("SP_Store");

        this.diamondBTN1 = this.storeNode.getChildByName("GRP_Diamond1").getChildByName("BTN_Diamond");
        this.diamondLB1 = this.diamondBTN1.getChildByName("LB_Diamond");

        this.diamondBTN2 = this.storeNode.getChildByName("GRP_Diamond2").getChildByName("BTN_Diamond");
        this.diamondLB2 = this.diamondBTN2.getChildByName("LB_Diamond");

        this.videoBTN = this.storeNode.getChildByName("GRP_Video").getChildByName("BTN_Video");
        this.videoSP = this.videoBTN.getChildByName("SP_Video");
        this.douyinSP = this.videoBTN.getChildByName("SP_Douyin");

        this.closeBTN = this.baseNode.getChildByName("BTN_Close");
    };


    // ---------------------------
    // 设置文本

    /** 设置钻石文本1 */
    public setDiamondLB1(curNum: number) {
        this.diamondLB1.getComponent(cc.Label).string = curNum.toString();
    };

    /** 设置钻石文本2 */
    public setDiamondLB2(curNum: number) {
        this.diamondLB2.getComponent(cc.Label).string = curNum.toString();
    };


    // ---------------------------
    // 通用函数

    /** 设置抖音端的样式 */
    private setDouyinStatus() {
        this.douyinSP.active = false;
        this.videoSP.active = false;

        if (CommonGlobal.getInstance().platform == Platform.Douyin) {
            this.douyinSP.active = true;
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

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };



    // ------------------------------------------------------------
    // 监听事件定义

    /** 设置钻石获得体力的事件1 */
    public setDiamondEvt1(curCall: Function) {
        this.diamondBTN1.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置钻石获得体力的事件2 */
    public setDiamondEvt2(curCall: Function) {
        this.diamondBTN2.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置视频获得体力的事件 */
    public setVideoEvt(curCall: Function) {
        this.videoBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置关闭界面的事件 */
    public setCloseEvt(curCall: Function) {
        this.closeBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}
