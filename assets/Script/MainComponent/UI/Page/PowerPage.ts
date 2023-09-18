/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.07
功能：体力控制页面
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import PoolManager from "../../../Expand/PoolManager";
import ToolsManager from "../../../Expand/ToolsManager";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import PowerMediator from "../Mediator/PowerMediator";
import TouchMaskPage from "./TouchMaskPage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PowerPage extends cc.Component {

    /** 体力动画的预制 */
    @property(cc.Prefab)
    private powerPrefab: cc.Prefab = null;

    /** 基础节点(用于进行弹出体力界面) */
    private curBase: cc.Node = null;

    /** 当前体力的数量的文本 */
    private curLB: cc.Node = null;

    /** 体力图片节点 */
    private powerSP: cc.Node = null;

    /** 当前钻石页面所存在的体力数 */
    private powerNum: number = 0;

    /** 倒计时控制总组件 */
    private timeOutCon: cc.Node = null;

    /** 倒计时文本节点 */
    private timeOutLB: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defineCommonPar();
        this.defination();
        this.registerPower();
    };



    // -------------------------------------------------------------------------------------
    // 内置函数

    /** 定义通用数据 */
    private defineCommonPar() {
        this.node.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);
        this.node.zIndex = 99;

        cc.game.addPersistRootNode(this.node);
    };

    /** 定义节点 */
    private defination() {
        this.curBase = this.node.getChildByName("SP_Base");
        this.curLB = this.curBase.getChildByName("LB_Power");
        this.powerSP = this.curBase.getChildByName("SP_Power");

        this.timeOutCon = this.curBase.getChildByName("GRP_TimeOut");
        this.timeOutLB = this.timeOutCon.getChildByName("LB_TimeOut");
    };

    /** 注册钻石中介 */
    private registerPower() {
        CommonFacade.getInstance().registerMediator(new PowerMediator(AllMediatorDefine.PowerMediator, this.node));

        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log("游戏进入后台");
            var getOutTime = new Date().getTime();
            CommonGlobal.getInstance().userData.getOutTime = getOutTime;
            CommonGlobal.getInstance().saveUserData();
        }, this);
    };

    /** 设置界面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };

    /** 设置钻石的文本 */
    public setPowerLB(powerNum: number) {
        this.powerNum = powerNum;
        this.curLB.getComponent(cc.Label).string = powerNum.toString() + " / " + CommonGlobal.getInstance().maxPowerNum;
    };

    /** 设置倒计时文本节点的文本 */
    public setTimeOutLB(curStr: string) {
        this.timeOutLB.getComponent(cc.Label).string = curStr;
    };

    /** 设置倒计时组件的显示 */
    public setTimeOutActive(isShow: boolean) {
        this.timeOutCon.active = isShow;
    };

    /** 增加体力动画 */
    public addPowerAnim(powerNum: number, curCall: Function) {
        TouchMaskPage.getInstance().setPageActive(true);

        let animNum = powerNum;
        // 单个体力所获得的钻石数
        let perpowerNum = Math.floor(powerNum / animNum);
        for (let i = 0; i < animNum; i++) {
            let addDiamondPre = PoolManager.getInstance().getNode(this.powerPrefab);
            if (!addDiamondPre) addDiamondPre = cc.instantiate(this.powerPrefab);
            this.node.addChild(addDiamondPre);
            addDiamondPre.active = false;

            let randX = ToolsManager.random(-600, 600);
            let randY = ToolsManager.random(-600, 600);
            addDiamondPre.setPosition(randX, randY);

            // 曲线设置
            let bezierpoint = [cc.v2(-50 + ToolsManager.random(-50, 50), 100 + ToolsManager.random(-50, 50)),
            cc.v2(-100 + ToolsManager.random(-50, 50), 300 + ToolsManager.random(-50, 50)),
            cc.v2(this.curBase.x + this.powerSP.x, this.curBase.y + this.powerSP.y)];

            let move1 = cc.bezierTo(0.6, bezierpoint);
            let move2 = cc.callFunc(() => {
                // 文本变化
                this.powerNum += perpowerNum;
                this.setPowerLB(this.powerNum);

                // 获得钻石节点动画
                this.powerSP.stopAllActions();
                cc.tween(this.powerSP)
                    .to(0.1, { scale: 1.4 })
                    .to(0.1, { scale: 1 })
                    .start()

                // 回收
                PoolManager.getInstance().putNode(addDiamondPre);

                if (i == (animNum - 1)) {
                    curCall && curCall()

                    setTimeout(() => {
                        TouchMaskPage.getInstance().setPageActive(false);
                    }, 300);
                }
            })

            this.scheduleOnce(() => {
                addDiamondPre.active = true;
                addDiamondPre.runAction(cc.sequence(move1, move2));
            }, 0.008 * i)
        }

    };

    /** 减少体力动画 */
    public reducePowerAnim(reduceNode: cc.Node, curCall: Function) {
        TouchMaskPage.getInstance().setPageActive(true);

        let reducePos = reduceNode.parent.convertToWorldSpaceAR(reduceNode.position);
        let animPos = this.node.convertToNodeSpaceAR(reducePos);

        let addDiamondPre = PoolManager.getInstance().getNode(this.powerPrefab);
        if (!addDiamondPre) addDiamondPre = cc.instantiate(this.powerPrefab);
        this.node.addChild(addDiamondPre);
        addDiamondPre.active = false;

        // 设置初始点的位置
        let canvasPos = this.powerSP.parent.convertToWorldSpaceAR(this.powerSP.position);
        let powerPos = this.node.convertToNodeSpaceAR(canvasPos);
        addDiamondPre.setPosition(powerPos);

        // 曲线设置
        let bezierpoint = [
            cc.v2(animPos.x * 0.3, animPos.y * 0.3 + ToolsManager.random(-20, 20)),
            cc.v2(animPos.x * 0.6 + ToolsManager.random(-20, 20), animPos.y * 0.6),
            cc.v2(animPos.x, animPos.y)];

        let move1 = cc.bezierTo(0.6, bezierpoint);
        let move2 = cc.callFunc(() => {
            console.log("移动成功")
            PoolManager.getInstance().putNode(addDiamondPre);

            reduceNode.runAction(cc.sequence(
                cc.scaleTo(0.2, 1.2),
                cc.scaleTo(0.1, 1),
                cc.callFunc(() => {
                    curCall && curCall()

                    setTimeout(() => {
                        TouchMaskPage.getInstance().setPageActive(false);
                    }, 300);
                })
            ))

            // curCall && curCall()
        })

        addDiamondPre.active = true;
        addDiamondPre.runAction(cc.sequence(move1, move2));

    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置体力的监听事件 */
    public setPowerEvt(curCall: Function) {
        this.curBase.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };


}
