/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：顶部桌面组件
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import SDKManager from "../../../Expand/SDKManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TopView extends cc.Component {

    /** 添加桌面的按钮 */
    private addDeskBTN: cc.Node = null;

    /** 录屏的按钮 */
    private recordBTN: cc.Node = null;

    /** 等待录屏状态的节点 */
    private recordSP: cc.Node = null;

    /** 录屏中的按钮 */
    private recordingBTN: cc.Node = null;

    /** 录屏文本的节点 */
    private recordLB: cc.Node = null;

    /** 提示客服的按钮 */
    private serviceBTN: cc.Node = null;

    /** 更多精彩的按钮 */
    private moreBTN: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
        this.refreshBTNShow();
    };

    update() {
        this.refreshRecordTime();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        this.addDeskBTN = this.node.getChildByName("SP_BG").getChildByName("BTN_AddDesk");

        this.recordBTN = this.node.getChildByName("SP_BG").getChildByName("BTN_Record");
        this.recordSP = this.recordBTN.getChildByName("SP_Record");

        this.recordingBTN = this.node.getChildByName("SP_BG").getChildByName("BTN_Recording");
        this.recordLB = this.recordingBTN.getChildByName("SP_Recording").getChildByName("LB_Record");

        this.serviceBTN = this.node.getChildByName("SP_BG").getChildByName("BTN_Service");

        this.moreBTN = this.node.getChildByName("SP_BG").getChildByName("BTN_More");

    };

    /** 刷新录屏的时间 */
    private refreshRecordTime() {
        let curBool = SDKManager.getInstance().getRecordType();
        if (curBool == true) {
            let recordTime = SDKManager.getInstance().getRecordTime();
            this.setRecordLB(recordTime);
        }
    };

    /** 设置录屏的状态 */
    public setRecordType(isRecord: boolean) {
        this.recordBTN.active = !isRecord;
        this.recordingBTN.active = isRecord;
    };

    /** 设置录屏文本 */
    public setRecordLB(curTime: number) {
        let minuteNum = Math.floor(curTime / 60);
        let secNum = curTime - minuteNum * 60;

        if (secNum < 10) {
            this.recordLB.getComponent(cc.Label).string = "0" + minuteNum + ":0" + secNum;
        } else {
            this.recordLB.getComponent(cc.Label).string = "0" + minuteNum + ":" + secNum;
        }
    };

    /** 刷新按钮的显示 */
    public refreshBTNShow() {
        this.addDeskBTN.active = false;
        this.recordBTN.active = false;
        this.recordingBTN.active = false;
        this.serviceBTN.active = false;
        this.moreBTN.active = false;

        if (CommonGlobal.getInstance().platform == Platform.Web) {
            this.recordBTN.active = true;
        }

        if ((SDKManager.getInstance().getChannelId() == "1008") || CommonGlobal.getInstance().platform == Platform.Web) {
            this.serviceBTN.active = true;
            this.moreBTN.active = true;
        }

    };



    // ------------------------------------------------------------
    // 函数定义

    /** 设置添加桌面的事件 */
    public setAddDeskEvt(curCall: Function) {
        this.addDeskBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置录屏的监听事件 */
    public setRecordEvt(curCall: Function) {
        this.recordBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置取消的监听事件 */
    public setCancelRecordEvt(curCall: Function) {
        this.recordingBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置客服按钮的监听事件 */
    public setServiceEvt(curCall: Function) {
        this.serviceBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置更多精彩的监听事件 */
    public setMoreEvt(curCall: Function) {
        this.moreBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}
