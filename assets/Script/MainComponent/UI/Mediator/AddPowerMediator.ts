/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.07
功能：增加体力界面中介者
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import TipsManager from "../../../Common/TipsManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import AddPowerPage from "../Page/AddPowerPage";

export default class AddPowerMediator extends Mediator {

    /** 增加体力界面 */
    private curPage: AddPowerPage = null;

    /** 增加体力的回调 */
    private addPowerCallFunc: Function = null;



    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return;
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return;
        }

        this.curPage = viewNode.getComponent(AddPowerPage);
        this.setPageActive(true);
        this.setDiamondLB();
        this.setButtonEvt();
    };



    // -------------------------------------------------------------------------------------
    // 内部函数

    /** 设置增加体力的回调 */
    public setCallFunc(setCall: Function) {
        this.addPowerCallFunc = setCall;
    };

    /** 设置钻石文本 */
    private setDiamondLB() {
        this.curPage.setDiamondLB1(CommonGlobal.getInstance().addPowerCostList[0]);
        this.curPage.setDiamondLB2(CommonGlobal.getInstance().addPowerCostList[1]);
    };

    /** 设置界面的显示 */
    public setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);
        CommonGlobal.getInstance().showPowerPage = isShow;

        if (isShow) {
            this.curPage.setPageAnim();
        }
    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置监听事件 */
    private setButtonEvt() {
        this.curPage.setDiamondEvt1(() => {
            this.diamondEvt1();
        })

        this.curPage.setDiamondEvt2(() => {
            this.diamondEvt2();
        })

        this.curPage.setVideoEvt(() => {
            this.videoEvt();
        })

        this.curPage.setCloseEvt(() => {
            this.closeEvt();
        })

    };

    /** 钻石获得体力的事件1 */
    public diamondEvt1() {
        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "powerGet", 1);

        const curCall = () => {
            this.setPageActive(false);
            TipsManager.getInstance().showTips("获得" + CommonGlobal.getInstance().addPowerList[0] + "点体力", 1, true);

            setTimeout(() => {
                this.addPowerCallFunc && this.addPowerCallFunc()
                this.addPowerCallFunc = null;
            }, 1000);

        }

        CommonFacade.getInstance().sendNotification(AllCommandDefine.AddPowerRequest, ({
            type: "coin",
            cost: CommonGlobal.getInstance().addPowerCostList[0],
            reward: CommonGlobal.getInstance().addPowerList[0],
            call: curCall
        }))
    };

    /** 钻石获得体力的事件2 */
    public diamondEvt2() {
        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "powerGet", 1);

        const curCall = () => {
            this.setPageActive(false);
            TipsManager.getInstance().showTips("获得" + CommonGlobal.getInstance().addPowerList[1] + "点体力", 1, true);

            setTimeout(() => {
                this.addPowerCallFunc && this.addPowerCallFunc()
                this.addPowerCallFunc = null;
            }, 1000);
        }

        CommonFacade.getInstance().sendNotification(AllCommandDefine.AddPowerRequest, ({
            type: "coin",
            cost: CommonGlobal.getInstance().addPowerCostList[1],
            reward: CommonGlobal.getInstance().addPowerList[1],
            call: curCall
        }))
    };

    /** 视频获得体力的事件 */
    public videoEvt() {
        AnalyticsManager.getInstance().reportAnalytics("adBtnClick_eventAnalytics", "powerGet", 1);

        const curCall = () => {
            this.setPageActive(false);
            TipsManager.getInstance().showTips("获得" + CommonGlobal.getInstance().addPowerList[2] + "点体力", 1, true);

            setTimeout(() => {
                this.addPowerCallFunc && this.addPowerCallFunc()
                this.addPowerCallFunc = null;
            }, 1000);
        }

        CommonFacade.getInstance().sendNotification(AllCommandDefine.AddPowerRequest, ({
            type: "video",
            cost: CommonGlobal.getInstance().addPowerCostList[2],
            reward: CommonGlobal.getInstance().addPowerList[2],
            call: curCall
        }))
    };

    /** 关闭界面的事件 */
    public closeEvt() {
        this.setPageActive(false);
    };

}
