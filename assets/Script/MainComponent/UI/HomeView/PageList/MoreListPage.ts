/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：更多设置的界面
*****************************************************/

import { Platform } from "../../../../Common/CommonEnum";
import CommonGlobal from "../../../../Common/CommonGlobal";
import SDKManager from "../../../../Expand/SDKManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoreListPage extends cc.Component {

    /** 设置列表的总节点 */
    private listCon: cc.Node = null;

    /** 背景音乐控制总节点 */
    private effectCon: cc.Node = null;
    /** 背景音乐的事件监听节点 */
    private effectTouch: cc.Node = null;
    /** 背景音乐的滚动条 */
    private effectBar: cc.Node = null;
    /** 背景音乐的圆点 */
    private effectCircle: cc.Node = null;

    /** 游戏音乐控制总节点 */
    private soundCon: cc.Node = null;
    /** 游戏音乐的事件监听节点 */
    private soundTouch: cc.Node = null;
    /** 游戏音乐的滚动条 */
    private soundBar: cc.Node = null;
    /** 游戏音乐的圆点 */
    private soudnCircle: cc.Node = null;

    /** 震动组件控制总节点 */
    private shakeCon: cc.Node = null;
    /** 震动组件的按钮控制节点 */
    private shakeBTNList: cc.Node = null;
    /** 震动组件的开启震动按钮图片 */
    private shakeOpenBTN: cc.Node = null;
    /** 震动组件的关闭震动按钮图片 */
    private shakeCloseBTN: cc.Node = null;


    /** qq的文本控制节点 */
    private qqLB: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defineCommonPar();
        this.defination();
        this.dealPlatform();
    };



    // ------------------------------------------------------------
    // 函数定义

    private defineCommonPar() {
        this.node.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);
        this.node.setPosition(cc.v2(0, 0));
    };

    /** 节点的定义 */
    private defination() {
        this.listCon = this.node.getChildByName("GRP_List");

        this.effectCon = this.listCon.getChildByName("GRP_Effect");
        this.effectTouch = this.effectCon.getChildByName("TouchNode");
        this.effectBar = this.effectTouch.getChildByName("CurBar");
        this.effectCircle = this.effectBar.getChildByName("SP_Circle");

        this.soundCon = this.listCon.getChildByName("GRP_Sound");
        this.soundTouch = this.soundCon.getChildByName("TouchNode");
        this.soundBar = this.soundTouch.getChildByName("CurBar");
        this.soudnCircle = this.soundBar.getChildByName("SP_Circle");

        this.shakeCon = this.listCon.getChildByName("GRP_Shake");
        this.shakeBTNList = this.shakeCon.getChildByName("GRP_BTN");
        this.shakeOpenBTN = this.shakeBTNList.getChildByName("BTN_Open");
        this.shakeCloseBTN = this.shakeBTNList.getChildByName("BTN_Close");

        this.qqLB = this.listCon.getChildByName("LB_QQ");

    };

    /** 根据平台的不同进行隐藏部分组件 */
    private dealPlatform() {
        this.qqLB.active = false;
        if (SDKManager.getInstance().getChannelId() == "1007") {
            this.qqLB.active = true;
        }
    };

    /** 设置特效声音的进度条的百分比 */
    public setEffectPer(perNum: number) {
        this.effectBar.getComponent(cc.ProgressBar).progress = perNum;
        this.effectCircle.x = (perNum - 0.5) * this.effectBar.width;
    };

    /** 设置游戏音乐的进度条的百分比 */
    public setSoundPer(perNum: number) {
        this.soundBar.getComponent(cc.ProgressBar).progress = perNum;
        this.soudnCircle.x = (perNum - 0.5) * this.soundBar.width;
    };

    /** 设置震动的类型 */
    public setShakeType(isOpen: boolean) {
        this.shakeOpenBTN.active = isOpen;
        this.shakeCloseBTN.active = !isOpen;
    };

    /** 设置qq的文本 */
    public setQQLB(curString: string) {
        this.qqLB.getComponent(cc.Label).string = "客服QQ: " + curString;
    };

    /** 计算特效音效的总节点所占的百分百 */
    public calculateEffectPer(curPos: cc.Vec2) {
        let changePos = this.effectBar.convertToNodeSpaceAR(curPos);
        let curPosX = changePos.x;

        let perNum = curPosX / this.effectBar.width;
        perNum += 0.5;
        if (perNum >= 1) {
            perNum = 1;
        } else if (perNum <= 0) {
            perNum = 0;
        }

        return perNum
    };

    /** 计算背景音效的总节点所占的百分百 */
    public calculateSoundPer(curPos: cc.Vec2) {
        let changePos = this.soundBar.convertToNodeSpaceAR(curPos);
        let curPosX = changePos.x;

        let perNum = curPosX / this.soundBar.width;
        perNum += 0.5;
        if (perNum >= 1) {
            perNum = 1;
        } else if (perNum <= 0) {
            perNum = 0;
        }

        return perNum
    };



    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置特效声音的监听事件 */
    public setEffectEvt(curCall: Function) {
        this.effectTouch.on(cc.Node.EventType.TOUCH_START, curCall, this);
        this.effectTouch.on(cc.Node.EventType.TOUCH_MOVE, curCall, this);
        this.effectTouch.on(cc.Node.EventType.TOUCH_END, curCall, this);
        this.effectTouch.on(cc.Node.EventType.TOUCH_CANCEL, curCall, this);
    };

    /** 设置游戏音乐的监听事件 */
    public setSoundEvt(curCall: Function) {
        this.soundTouch.on(cc.Node.EventType.TOUCH_START, curCall, this);
        this.soundTouch.on(cc.Node.EventType.TOUCH_MOVE, curCall, this);
        this.soundTouch.on(cc.Node.EventType.TOUCH_END, curCall, this);
        this.soundTouch.on(cc.Node.EventType.TOUCH_CANCEL, curCall, this);
    };

    /** 设置震动的监听事件 */
    public setShakeEvt(curCall: Function) {
        this.shakeBTNList.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };


}
