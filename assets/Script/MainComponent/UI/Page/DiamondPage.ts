/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：钻石控制页面
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import PoolManager from "../../../Expand/PoolManager";
import ToolsManager from "../../../Expand/ToolsManager";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import DiamondMediator from "../Mediator/DiamondMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DiamondPage extends cc.Component {

    /** 钻石动画的预制 */
    @property(cc.Prefab)
    private diamondPrefab: cc.Prefab = null

    /** 基础节点(用于进行弹出钻石界面) */
    private curBase: cc.Node = null;

    /** 当前钻石的数量的文本 */
    private curLB: cc.Node = null;

    /** 钻石图片节点 */
    private diamondSP: cc.Node = null;

    /** 当前钻石页面所存在的钻石数 */
    private diamondNum: number = 0;

    /** 钻石动画展示的钻石节点数 */
    private diamondAnimNum: number = 30;



    onLoad() {
        this.defineCommonPar();
        this.defination();
        this.registerDiamond();
    };

    private defineCommonPar() {
        this.node.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);
        this.node.zIndex = 99;

        cc.game.addPersistRootNode(this.node);
    };

    /** 定义节点 */
    private defination() {
        this.curBase = this.node.getChildByName("SP_Base");
        this.curLB = this.curBase.getChildByName("LB_Diamond");
        this.diamondSP = this.curBase.getChildByName("SP_Diamond");
    };


    // -------------------------------------------------------------------------------------
    // 内置函数

    /** 注册钻石中介 */
    private registerDiamond() {
        CommonFacade.getInstance().registerMediator(new DiamondMediator(AllMediatorDefine.DiamondMediator, this.node));
    };

    /** 设置界面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };

    /** 设置钻石的文本 */
    public setDiamondLB(diamondNum: number) {
        this.diamondNum = diamondNum;
        this.curLB.getComponent(cc.Label).string = diamondNum.toString();
    };

    /** 增加钻石的动画 */
    public addDiamondAnim(diamondNum: number, curCall: Function) {
        let animNum = this.diamondAnimNum;
        if (diamondNum <= this.diamondAnimNum) animNum = diamondNum;

        // 单个钻石所获得的钻石数
        let perDiamondNum = Math.floor(diamondNum / animNum);
        for (let i = 0; i < animNum; i++) {
            let addDiamondPre = PoolManager.getInstance().getNode(this.diamondPrefab);
            if (!addDiamondPre) addDiamondPre = cc.instantiate(this.diamondPrefab);
            this.node.addChild(addDiamondPre);
            addDiamondPre.active = false;

            let randX = ToolsManager.random(-600, 600);
            let randY = ToolsManager.random(-600, 600);
            addDiamondPre.setPosition(randX, randY);

            // 曲线设置
            let bezierpoint = [cc.v2(-50 + ToolsManager.random(-50, 50), 100 + ToolsManager.random(-50, 50)),
            cc.v2(-100 + ToolsManager.random(-50, 50), 300 + ToolsManager.random(-50, 50)),
            cc.v2(this.curBase.x + this.diamondSP.x, this.curBase.y + this.diamondSP.y)];

            let move1 = cc.bezierTo(0.6, bezierpoint);
            let move2 = cc.callFunc(() => {
                // 文本变化
                this.diamondNum += perDiamondNum;
                this.setDiamondLB(this.diamondNum);

                // 获得钻石节点动画
                this.diamondSP.stopAllActions();
                cc.tween(this.diamondSP)
                    .to(0.1, { scale: 1.4 })
                    .to(0.1, { scale: 1 })
                    .start()

                // 回收
                PoolManager.getInstance().putNode(addDiamondPre);

                if (i == (animNum - 1)) {
                    curCall && curCall()
                }
            })

            this.scheduleOnce(() => {
                addDiamondPre.active = true;
                addDiamondPre.runAction(cc.sequence(move1, move2));
            }, 0.008 * i)
        }
    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置钻石的监听事件 */
    public setDiamondEvt(curCall: Function) {
        this.curBase.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };


}
