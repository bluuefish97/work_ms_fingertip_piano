/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.20
功能：钢琴块的基础单元
*****************************************************/

import { NormalKeyType } from "../../../../Common/CommonEnum";
import CommonGlobal from "../../../../Common/CommonGlobal";
import DownloadManager from "../../../../Expand/DownloadManager";



const { ccclass, property } = cc._decorator;

@ccclass

export default class BaseKeyUnit extends cc.Component {


    /** 普通的样式节点 */
    protected normalSP: cc.Node = null;
    /** 开始的样式节点 */
    protected startSP: cc.Node = null;
    /** 点击过的样式节点 */
    protected pressedSP: cc.Node = null;
    /** 护盾的样式节点 */
    protected shieldSP: cc.Node = null;
    /** 拖尾图片节点 */
    protected trailSP: cc.Node = null;

    /** 钢琴块的总时间长度 */
    protected keyCutTime: number = 0;

    /** 当前钢琴块的值 */
    protected curKeyNum: number = 0;

    /** 当前钢琴块的移动速度 */
    protected curSpeedNum: number = 0;

    /** 表当前的钢琴块是否点击过 */
    protected isPressed: boolean = false;

    /** 父节点的脚本 */
    protected parentJS = null;

    /** 当前板子被点击之后显示的透明度 */
    protected pressedOpacity = 50;

    /** 当前钢琴块的长度 */
    protected keyLen = 0;

    /** 当前钢琴块的高潮点类型(0普通,1开始高潮,2结束高潮) */
    protected curHighType: number = 0;

    /** 当前钢琴块的类型 */
    protected curKeyType: NormalKeyType = NormalKeyType.Normal;

    onLoad() {
        this.defination();
        this.resetKey();
        this.setBTNEvent();
    };

    update(dt) {
    };

    protected defination() {
        this.normalSP = this.node.getChildByName("SP_Normal");
        this.startSP = this.node.getChildByName("SP_Start");
        this.pressedSP = this.node.getChildByName("SP_Pressed");
        this.shieldSP = this.node.getChildByName("SP_Shield");
        this.trailSP = this.node.getChildByName("SP_Trailing");
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 对当前的钢琴块进行初始初始化操作 */
    public resetKey() {
        this.setPressed(false);
        this.keyCutTime = 0;
        this.parentJS = null;
        this.keyLen = 0;
    };

    /** 设置钢琴块的状态 */
    protected setPressed(isPressed: boolean) {
        this.isPressed = isPressed;
    };

    /** 设置钢琴块的值 */
    public setKeyNum(keyNum: number) {
        this.curKeyNum = keyNum;
    };

    /** 设置钢琴块的移动速度 */
    public setKeySpeed(speedNum: number) {
        this.curSpeedNum = speedNum;
    };

    /** 设置钢琴块的时间端 */
    public setLenTime(curTime: number) {
    };

    /** 设置钢琴块的时间端 */
    public setCutTime(cutTime: number) {
    };

    /** 设置普通钢琴块的样式 */
    public setNormalKeyType(keyType: NormalKeyType) {
        this.normalSP.active = false;
        this.startSP.active = false;
        this.pressedSP.active = false;
        this.shieldSP.active = false;
        this.trailSP.opacity = 255;

        if (keyType != NormalKeyType.Shield) {
            this.curKeyType = keyType;
        }
        switch (keyType) {
            case NormalKeyType.StartGame:
                this.startSP.active = true;
                break

            case NormalKeyType.Normal:
                this.normalSP.active = true;
                break

            case NormalKeyType.Pressed:
                this.pressedSP.active = true;
                this.pressedSP.opacity = this.pressedOpacity;
                this.setPressed(true);
                this.trailSP.opacity = 150;
                break

            case NormalKeyType.Shield:
                this.shieldSP.active = true;
                break
        }

        this.showTraillSP();
    };

    /** 刷新当前钢琴块的样式 */
    public refreshKeySP() {
        console.log("curKeyNum : ", this.curKeyNum);
    }

    /** 设置当前节奏点的样式 */
    public setKeyType() {
        if (this.curKeyNum == 0) {
            this.setNormalKeyType(NormalKeyType.StartGame);
        } else {
            this.setNormalKeyType(NormalKeyType.Normal);
        }
    };

    /** 对钢琴块的样式进行重新设置 */
    public refreshKeyType() {
        this.setNormalKeyType(this.curKeyType);
        this.refreshKeySP();
    };

    /** 展示拖尾图片 */
    protected showTraillSP() {
        return

        this.trailSP.active = false;
        if (CommonGlobal.getInstance().gameHighing == true) {
            this.trailSP.y = this.node.height;
            this.trailSP.active = true;
        }
    };

    /** 获得当前的类型 */
    public getKeyType() {
        return this.curKeyType
    };

    /** 设置父节点的脚本 */
    public setParentJS(curJS) {
        this.parentJS = curJS;
    };



    // ------------------------------------------------------------
    // 监听事件

    /** 设置按钮的监听事件 */
    protected setBTNEvent() {
        this.clickCurKey();
    };

    /** 点击当前的钢琴块 */
    protected clickCurKey() {
    };

    /** 设置当前节点的高潮点类型 */
    public setHighType(typeNum: number) {
        this.curHighType = typeNum;
    };

}
