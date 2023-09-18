/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.05
功能：奖励宝盒界面的中介
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import TipsManager from "../../../Common/TipsManager";
import AdManager from "../../../Expand/AdManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import DiamondManager from "../../../Expand/DiamondManager";
import LocalStorageManager from "../../../Expand/LocalStorageManager";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import RewardBoxPage from "../Page/RewardBoxPage";

export default class RewardBoxMediator extends Mediator {

    /** 钻石界面 */
    private curPage: RewardBoxPage = null;

    /** 第几个礼物 */
    private giftNum: number = 0;

    /** 获得奖励数 */
    private rewardNum: number = 200;

    private rewardList = [
        50, 100, 200
    ]

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(RewardBoxPage);
        this.setButtonEvt();
    };



    // ------------------------------------------------------------
    // 内置函数

    /** 设置第几个礼物数 */
    public setGiftNum(curNum: number) {
        this.giftNum = curNum;
        this.setRewardNum(this.rewardList[this.giftNum]);
    };

    /** 重新设置奖励数字 */
    public setRewardNum(rewardNum: number) {
        this.rewardNum = rewardNum;
        this.setRewardLB();
    };

    /** 设置文本 */
    private setRewardLB() {
        this.curPage.setRewardLB(this.rewardNum);
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);
    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置按钮监听事件 */
    private setButtonEvt() {
        this.curPage.setRewardEvt(() => {
            this.rewardEvt();
        })

        this.curPage.setDoubleEvt(() => {
            this.doubleEvt();
        })

        this.curPage.setCloseEvt(() => {
            this.closeEvt();
        })

    };

    /** 直接获得奖励的监听事件 */
    private rewardEvt() {
        TipsManager.getInstance().showTips("获得礼物", 1, true);
        LocalStorageManager.setlocalStorage("getGiftReward" + this.giftNum, true);

        DiamondManager.getInstance().addDiamond(this.rewardNum);
        CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshDiamondResponse, ({
            type: this.rewardNum
        }));

        AudioPlayManager.playBoxRewardAU();
        this.setPageActive(false);
        CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshGiftResponse);

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "treasureGet", 1);

        // 安卓直接获得奖励弹插屏
        if (CommonGlobal.getInstance().platform == Platform.Android) {
            AdManager.showInsertAD();
        }
    };

    /** 获得双倍奖励的监听事件 */
    private doubleEvt() {
        const rewardFunc = () => {
            TipsManager.getInstance().showTips("获得礼物", 1, true);
            LocalStorageManager.setlocalStorage("getGiftReward" + this.giftNum, true);

            DiamondManager.getInstance().addDiamond(this.rewardNum * 2);
            CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshDiamondResponse, ({
                type: this.rewardNum * 2
            }));

            AudioPlayManager.playBoxRewardAU();
            this.setPageActive(false);
            CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshGiftResponse);
        }

        CommonFacade.getInstance().sendNotification(AllCommandDefine.RewardBoxRequest, ({
            curCall: rewardFunc
        }));

        AnalyticsManager.getInstance().reportAnalytics("adBtnClick_eventAnalytics", "treasureGet", 1);
    };

    /** 关闭按钮的监听事件 */
    private closeEvt() {
        this.setPageActive(false);
    };

}
